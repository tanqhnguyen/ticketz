from core.tests import ApiTestCase
from core.models import User, Event
import json

class EventDeleteTest(ApiTestCase):
    def test_success_delete_api(self):
        response = self.post_json("api_event_create")
        event_id = response["data"]["id"]
        response = self.post_json("api_event_delete", {
            'id': event_id
        })
        # print response
        self.assertFalse("error" in response)
        count = Event.objects.filter(user_id=self.user.id).count()
        self.assertEquals(count, 0)
        self.assertIsNotNone(response["data"])
