from django.db import models
from core.models import AbstractModel
import time
from django.forms.models import model_to_dict 
from django.core.urlresolvers import reverse
import random, string

from django.template import Context
from django.template.loader import get_template

from core.utils import create_pdf
from django.core.mail import EmailMessage


class SoldTicket(AbstractModel):
    created_date = models.BigIntegerField(default=int(round(time.time() * 1000)))
    code = models.TextField(max_length=36, unique=True)
    is_used = models.BooleanField(default=False)

    ticket_type = models.ForeignKey('TicketType', related_name="tickets")
    user = models.ForeignKey('User', related_name="tickets")
    event = models.ForeignKey('Event', related_name="tickets")

    html = None
    pdf = None

    class Meta:
        app_label = "core"

    def get_absolute_url(self):
        return reverse('ticket_view', kwargs={'code': self.code})

    def generate_url(self):
        return {
            'view': self.get_absolute_url()
        }


    def json_data(self):
        data = model_to_dict(self, exclude=['user', 'ticket_type', 'event'])
        data['event'] = self.event.json_data(['ticket_types', 'json'])
        data['url'] = self.generate_url()
        data['user'] = self.user.json_data()
        return data

    def generate_qr_code(self):
        # do nothings for now
        return self

    def generate_pdf(self):
        if not self.pdf:
            self.pdf = create_pdf(self.get_detail_template())
        return self.pdf

    def get_detail_template(self):
        if not self.html:
            template = get_template('ticket/view.html')
            context = Context(self.generate_detail_template_context())
            self.html = template.render(context)
        return self.html

    def send_email(self):
        event = self.ticket_type.event
        html = self.get_detail_template()
        context = dict()

        context['subject'] = "Ticket for event %s" % event.title
        context['to'] = (self.user.email, )
        context['body'] = html

        message = EmailMessage(**context)
        message.content_subtype = "html"
        message.attach(self.code+'.pdf', self.generate_pdf().getvalue(), 'application/pdf')
        message.send()


    def generate_detail_template_context(self):
        context = dict()
        event = self.ticket_type.event
        context['event'] = event
        context['start_date'] = event.format_date('start_date')
        context['end_date'] = event.format_date('end_date')
        context['ticket'] = self

        return context

    @classmethod
    def random_code(cls):
        while 1:
            random_code = ''.join(random.choice(string.uppercase+'0123456789') for i in range(10))
            try:
                cls.objects.get(code=random_code)
            except:
                return random_code