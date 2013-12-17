from django.test import TestCase
from core.models import User
import json
from django.core.urlresolvers import reverse

class ApiTestCase(TestCase):
    fixtures = ['fixtures.json']

    def setUp(self):
        self.user = User.objects.order_by('-id')[0]
        self.client.login(username=self.user.username, password='123qwe')

    def post_json(self, url, data = {}):
        response = self.client.post(reverse(url), json.dumps(data), content_type="application/json")
        return json.loads(response.content)