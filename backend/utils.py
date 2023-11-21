from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Note
from .serializers import NoteSerializer

@permission_classes([IsAuthenticated])
def getNotesList(request):
    user = request.user
    #returns list of all notes from db, need to serialize into json form
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True)    #returned as an object
    return Response(serializer.data)

def getNoteDetail(request, id):
    #returns list of all notes from db, need to serialize into json form
    notes = Note.objects.get(id=id)
    serializer = NoteSerializer(notes, many=False)    #returned as an object, serialize single object
    return Response(serializer.data)

def createNote(request):
    data = request.data
    note = Note.objects.create(
        body=data
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)

def updateNote(request, id):
    #return obj, already in json
    data = request.data
    note = Note.objects.get(id=id)
    #get instance of the note that needs to be updated with new info
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

def deleteNote(request, id):
    note = Note.objects.get(id=id)
    #removes object from database
    note.delete()
    return Response('Note was deleted')