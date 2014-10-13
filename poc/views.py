import json
from datetime import datetime
from django.http import HttpResponse
from django.shortcuts import render


comment_data = [
    {'id': 1, 'author': "Pete Hunt", 'text': "This is one comment asdasd"},
    {'id': 2, 'author': "Jordan Walke", 'text': "This is *another* comment"}
]


def home(request):
    return render(request, 'poc/index.html', {'data': json.dumps(comment_data)})


def data(request):
    comment_data.append({'id': datetime.utcnow().microsecond, 'author': 'matt', 'text': 'another bloody comment at {0}'.format(datetime.utcnow())})
    return HttpResponse(json.dumps(comment_data), content_type='application/json')
