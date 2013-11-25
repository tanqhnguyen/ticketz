import json
from django import template
register = template.Library()

@register.filter(name="json_dumps")
def json_dumps(value):
    return json.dumps(value)