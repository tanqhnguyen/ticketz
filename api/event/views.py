from api.views import ApiView

class CreateView(ApiView):
    @method_decorator(login_required)
    def post(self, request):
        user_id = request.user.id
        event = Event.first_or_create(user_id)
        data = event.json_data()

        return self.json({"data": data})

class DeleteView(ApiView):
    @method_decorator(login_required)
    @method_decorator(event_owner())
    def post(self, request):
            data = json.loads(request.raw_post_data)
            # data is now a Python dict representing the uploaded JSON.
            id = data['id']
            event = Event.objects.get(pk = id)
            event.delete()
            data = event.json_data()
            return self.json({"data": data})

class UpdateView(ApiView):
    @method_decorator(login_required)
    @method_decorator(event_owner())
    def post(self, request):
        data = json.loads(request.raw_post_data)
        # data is now a Python dict representing the uploaded JSON.
        id = data['id']
        event = Event.objects.get(pk = id)
        ticket_type=data['ticket_type']
        event.check_ticket_types(ticket_type)
        event.name=data['name']
        event.ticket_type=data['ticket_type']
        event.age_limit=data['age_limit']
        event.description=data['description']
        event.end_date=data['end_date']
        event.start_date=data['start_date']
        event.save()
        data = event.json_data()
        return self.json({"data": data})

class ListView(ApiView):
    def get(self, request):
        offset = int(request.GET.get('offset', 0))
        limit = int(request.GET.get('limit', 10))
        print request.GET.get('sort[date_created]')
        print request.GET.get('sort[title]')

        events = [{"id": x, "title": "Event " + str(x), "is_active": x%2==0} for x in range(1, 1000)]
        check = request.GET.get('active') == 'true'
        events = [e for e in events if e['is_active'] == check]

        return self.json({
            "data": events[offset:offset+limit],
            "pagination": {
                "total": len(events),
                "offset": offset,
                "limit": limit
            }
        })








