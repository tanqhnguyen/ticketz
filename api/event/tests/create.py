from core.tests import ApiTestCase
from core.models import User, Event
import json

class EventTestCase(ApiTestCase):
    def test_success_create_api(self):
        response = self.post_json("api_event_create")
        self.assertEquals(response["error"], None)
        count = Event.objects.get(user_id=self.user.id).count()
        self.assertEquals(count, 1)