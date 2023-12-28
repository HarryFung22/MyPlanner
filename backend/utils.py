from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Note
from .serializers import NoteSerializer
 

def getNotesList(request, user):
    notes = Note.objects.filter(user=user).order_by('-updated')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

def getNoteDetail(request, user, id):
    note = Note.objects.get(user=user, id=id)
    serializer = NoteSerializer(note)
    return Response(serializer.data)

def createNote(request, user):
    print(user)
    data = request.data
    note = Note.objects.create(body=data.get('body'), user=user)
    serializer = NoteSerializer(note)
    return Response(serializer.data, status=201)

def updateNote(request, user, id):
    #return obj, already in json
    data = request.data
    note = Note.objects.get(user=user, id=id)
    #get instance of the note that needs to be updated with new info
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


def deleteNote(request, user, id):
    note = Note.objects.get(user=user, id=id)
    note.delete()
    return Response('Note was deleted')