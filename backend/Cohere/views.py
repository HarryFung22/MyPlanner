from .utils import summarize, generate
from rest_framework.decorators import api_view

@api_view(['GET', 'POST'])
def getSummarize(request):
    if request.method == 'POST':
        return summarize(request)
    
@api_view(['GET', 'POST'])
def getGenerate(request):
    if request.method == 'POST':
        return generate(request)