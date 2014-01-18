from core.tests import ApiTestCase
from core.models import Event

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

        update_data = {
            'id': event_id,
            'ticket_types': [
                {
                    'name': 'Free',
                    'type': 'free',
                    'price': 0,
                    'amount': 100
                }
            ]
        }

        response = self.post_json("api_event_update", update_data)
        self.assertFalse("error" in response)
        self.assertIsNotNone(response["data"])
        self.assertEquals(len(response["data"]["ticket_types"]), 1)

        event = Event.objects.get(pk=event_id)
        self.assertEquals(event.ticket_types.count(), 1)