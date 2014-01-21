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

class EventUpdateTest(ApiTestCase):
    def test_success_update_api(self):
        old_even = self.post_json("api_event_create")
        event_id = old_even["data"]["id"]
        update_data = {
            'id': event_id,
            'title': 'My new event title',
            'description': 'a whole new description',
            'json': {
                'ticketBodyColor': '#efefef'
            }
        }
        response = self.post_json("api_event_update", update_data)
        self.assertFalse("error" in response)
        self.assertIsNotNone(response["data"])
        event = Event.objects.get(pk=event_id)
        self.assertEquals(event.title, update_data['title'])
        self.assertEquals(event.description, update_data['description'])
        self.assertEquals(event.json.get('detailTitleColor'), old_even['data']['json'].get('detailTitleColor'))

    def test_create_ticket_types(self):
        old_even = self.post_json("api_event_create")        
        event_id = old_even["data"]["id"]
        update_data = {
            'id': event_id,
            'ticket_types': [
                {
                    'name': 'Free',
                    'type': 'free',
                    'price': 0,
                    'amount': 100
                },
                {
                    'name': 'V.I.P',
                    'type': 'vip',
                    'price': 20,
                    'amount': 100
                }
            ]
        }

        response = self.post_json("api_event_update", update_data)
        self.assertFalse("error" in response)
        self.assertIsNotNone(response["data"])
        self.assertEquals(len(response["data"]["ticket_types"]), 2)

        event = Event.objects.get(pk=event_id)
        self.assertEquals(event.ticket_types.count(), 2)


    def test_update_ticket_types(self):
        old_even = self.post_json("api_event_create")        
        event_id = old_even["data"]["id"]
        update_data = {
            'id': event_id,
            'ticket_types': [
                {
                    'name': 'Free',
                    'type': 'free',
                    'price': 0,
                    'amount': 100
                },
                {
                    'name': 'V.I.P',
                    'type': 'vip',
                    'price': 20,
                    'amount': 100
                }
            ]
        }

        response = self.post_json("api_event_update", update_data)

        new_name = 'Free for all'
        update_data = response['data']
        update_data.get('ticket_types').pop()
        update_data.get('ticket_types')[0]['name'] = new_name

        response = self.post_json("api_event_update", update_data)
        self.assertFalse("error" in response)
        self.assertIsNotNone(response["data"])
        self.assertEquals(len(response["data"]["ticket_types"]), 1)
        self.assertEquals(response["data"]["ticket_types"][0]['name'], new_name)

        event = Event.objects.get(pk=event_id)
        self.assertEquals(event.ticket_types.count(), 1)
        self.assertEquals(event.ticket_types.all()[0].name, new_name)