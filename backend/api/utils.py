from rest_framework.response import Response
import cohere
import os
from dotenv import load_dotenv

load_dotenv()

co = cohere.Client(os.getenv('SECRET_KEY'))

def summarize(request):
    data=request.data
    response = co.summarize(
        text=data.get('text'),
        model='command',
        length='medium',
        extractiveness='medium'
    )
    summary=response.summary

    return Response(summary)

def generate(request):
    data=request.data
    response = co.generate(  
        model='command-nightly',  
        prompt = data.get('prompt'),  
        max_tokens=200, 
        temperature=0.750
    )

    intro_paragraph = response.generations[0].text

    return Response(intro_paragraph)
