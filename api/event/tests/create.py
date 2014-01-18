from core.tests import ApiTestCase
from core.models import User, Event
import json

class EventCreateTest(ApiTestCase):
    def test_success_create_api(self):
        response = self.post_json("api_event_create")
        self.assertFalse("error" in response)
        count = Event.objects.filter(user_id=self.user.id).count()
        self.assertEquals(count, 1)
        self.assertIsNotNone(response["data"])

        event_data = response["data"]
        self.assertEquals(event_data["user_id"], self.user.id)

    def test_create_event_twice(self):
        self.post_json("api_event_create")
        response = self.post_json("api_event_create")
        self.assertFalse("error" in response)
        count = Event.objects.filter(user_id=self.user.id).count()
        self.assertEquals(count, 1)

        event_data = response["data"]
        self.assertEquals(event_data["user_id"], self.user.id)