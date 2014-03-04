from api.views import ApiView
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.utils.translation import ugettext as _

class UpdateView(ApiView):
    @method_decorator(login_required)
    def post(self, request):
        user = request.user
        data = self.request.json_data
        current_password = data.get('current_password')
        new_password = data.get('new_password')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        email = data.get('email')

        social_user = user.get_social_user()
        if not social_user and not user.check_password(current_password):
            return self.json({'error': _('Wrong password')})

        if not social_user and new_password:
            user.set_password(new_password)

        if first_name:
            user.first_name = first_name

        if last_name:
            user.last_name = last_name

        if email:
            user.email = email

        user.save()
        return self.json({
                'data': user.json_data(),
                'success': _('Your information has been updated')
            })