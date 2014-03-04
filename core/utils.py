from django.http import HttpResponse
import simplejson

from xhtml2pdf import pisa
from StringIO import StringIO

def create_pdf(pdf_data):
    pdf = StringIO()
    pisa.CreatePDF(StringIO(pdf_data), pdf)
    return pdf

def json_response(data):
    json_data = simplejson.dumps(data, separators=(',', ':'))
    status_code = 200
    
    if 'error' in data:
        status_code = 400
    return HttpResponse(json_data, content_type="application/json", status=status_code)