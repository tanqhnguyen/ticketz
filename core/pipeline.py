from uuid import uuid4

from social.utils import slugify, module_member
from social.exceptions import AuthException
from social.pipeline.partial import partial
from django.utils.translation import ugettext_lazy as _
from core.models import User
from django.shortcuts import render_to_response


USER_FIELDS = ['username', 'email']


def get_username(strategy, details, user=None, *args, **kwargs):
    if 'username' not in strategy.setting('USER_FIELDS', USER_FIELDS):
        return
    storage = strategy.storage

    if not user:
        email_as_username = strategy.setting('USERNAME_IS_FULL_EMAIL', False)
        uuid_length = strategy.setting('UUID_LENGTH', 16)
        max_length = storage.user.username_max_length()
        do_slugify = strategy.setting('SLUGIFY_USERNAMES', False)
        do_clean = strategy.setting('CLEAN_USERNAMES', True)

        if do_clean:
            clean_func = storage.user.clean_username
        else:
            clean_func = lambda val: val

        if do_slugify:
            override_slug = strategy.setting('SLUGIFY_FUNCTION')
            if override_slug:
                slug_func = module_member(override_slug)
            else:
                slug_func = slugify
        else:
            slug_func = lambda val: val

        if email_as_username and details.get('email'):
            username = details['email']
        elif details.get('username'):
            username = details['username']
        else:
            username = uuid4().hex

        short_username = username[:max_length - uuid_length]
        final_username = slug_func(clean_func(username[:max_length]))

        # Generate a unique username for current user using username
        # as base but adding a unique hash at the end. Original
        # username is cut to avoid any field max_length.
        while storage.user.user_exists(username=final_username):
            username = short_username + uuid4().hex[:uuid_length]
            final_username = slug_func(clean_func(username[:max_length]))
    else:
        final_username = storage.user.get_username(user)
    return {'username': final_username.lower()}

@partial
def user_password(strategy, user, is_new=False, *args, **kwargs):
    if strategy.backend_name != 'username':
        return

    template = 'core/login.html'
    if is_new:
        template = 'core/register.html'

    request_data = strategy.request_data()
    errors = {}
    password = request_data.get('password')
    username = request_data.get('username')
    email = request_data.get('email')

    if not username:
        errors['username'] = _('Username is required')

    if not password:
        errors['password'] = _('Password is required')

    if len(errors):
        context = {'errors': errors}
        return render_to_response(template, context)

    username = username.lower()
    if is_new:
        if not email:
            errors['email'] = _('Email is required')

        if User.objects.filter(username=username).count():
            errors['username'] = _('Username is not available')

        if len(errors):
            return render_to_response(template, {'errors': errors})

        email = email.lower()
        user.set_password(password)
        user.username = username
        user.email = email
        user.save()
    elif not user.validate_password(password):
        errors['password'] = errors['username'] = _('Incorrect password or username')
        return render_to_response(template, {'errors': errors})