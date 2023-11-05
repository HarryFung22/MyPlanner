from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer

# specifies endpoints
@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },  
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    #safe allows for return more than just a dictionary
    return Response(routes)

@api_view(['GET'])
def getNotes(request):
    #returns list of all notes from db, need to serialize into json form
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)    #returned as an object
    return Response(serializer.data)

#pass primary key/id to return specific req
@api_view(['GET'])
def getNote(request, id):
    #returns list of all notes from db, need to serialize into json form
    notes = Note.objects.get(id=id)
    serializer = NoteSerializer(notes, many=False)    #returned as an object, serialize single object
    return Response(serializer.data)