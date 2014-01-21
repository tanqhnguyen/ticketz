from core.tests import ApiTestCase
from core.models import User, Event
import json

class TicketPurchaseTest(ApiTestCase):
    def test_success_purchase_api(self):
        response = self.post_json("api_event_create")
        
        pass