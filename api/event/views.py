from api.views import ApiView
from core.models.event import Event
from django.contrib.auth.decorators import login_required
import django.utils.json as json
from django.http import HttpResponse
from django.utils.decorators import method_decorator


class CreateView(ApiView):

    @method_decorator(login_required)
    def post(self, request):
        event = Event()
        event.user = request.user
        id = event._get_pk_val
        name = ''
        description = ''
        age_limit = None
        start_date = None
        end_date = None
        event.is_active=False
        is_active=event.is_active
        data = {"id":id,"name":name,"description":description,"age_limit":age_limit,
                    "start_date":start_date,"end_date":end_date,"is_active":is_active}

        return HttpResponse(self.json(data))



# class UpdateView(ApiView):
#     # def get(self, request):
#     #     return self.json({"it is": "ok"})
#     @method_decorator(login_required)
#     def post(self, request):
#         # if request.is_ajax():
#             json_data = request.read()
#             # json_data contains the data uploaded in request
#             data = json.loads(json_data)
#             # data is now a Python dict representing the uploaded JSON.
#             id = data['id']
#             name = data['name']
#             description = data['description']
#             age_limit = data['age_limit']
#             start_date = data['start_date']
#             end_date = data['end_date']
#             event = Event.objects.get(pk = id)
#             if event.user == request.user:
#                 event.name = name
#                 event.description = description
#                 event.age_limit = age_limit
#                 event.start_date = start_date
#                 event.end_date = end_date
#                 event.is_active = True
#                 event.save()
#                 return self.json(data)
#                 # return HttpResponse(json.dumps(data), mimetype='application/json')
#             else:
#                 return self.json({"error":"blah"})
#
# class UpdateView(ApiView):
#     def get(self, request):
#         eventId = request.GET["id"]
#         event = Event.objects.get(pk = eventId)
#         name = event.name
#         description = event.description
#         age_limit = event.age_limit
#         start_date = event.start_date
#         end_date = event.end_date
#         data = {"name":name,"description":description,"age_limit":age_limit,"start_date":start_date,"end_date":end_date}
#         return HttpResponse(json.dumps(data), mimetype='application/json')

class DeleteView(ApiView):
    @login_required
    def post(self, request):
            json_data = request.read()
            # json_data contains the data uploaded in request
            data = json.loads(json_data)
            # data is now a Python dict representing the uploaded JSON.
            id = data['id']
            event = Event.objects.get(pk = id)
            name = event.name
            description = event.description
            age_limit = event.age_limit
            start_date = event.start_date
            end_date = event.end_date

            data = {"id":id,"name":name,"description":description,"age_limit":age_limit,
                    "start_date":start_date,"end_date":end_date}

            if event.user == request.user:

                return HttpResponse(self.json(data))
            else:
                return HttpResponse(self.json({"Not enough permission to update event"}))





