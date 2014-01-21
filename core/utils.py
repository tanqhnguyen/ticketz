from django.http import HttpResponse
import simplejson

def json_response(data):
    json_data = simplejson.dumps(data, separators=(',', ':'))
    return HttpResponse(json_data, content_type="application/json")
