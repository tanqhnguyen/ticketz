from django.http import HttpResponse
import simplejson

def json_response(data):
    json_data = simplejson.dumps(data, separators=(',', ':'))
    status_code = 200
    if data['error']:
        status_code = 400
    return HttpResponse(json_data, content_type="application/json", status=status_code)
