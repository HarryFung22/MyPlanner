from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Note
from .serializers import NoteSerializer
 
def getNotesList(request):
    user = request.user
    if user.is_authenticated:
        notes = Note.objects.filter(user=user).order_by('-updated')
        serializer = NoteSerializer(notes, many=True)
        return Response(serializer.data)
    return Response("Unauthorized", status=401)

def getNoteDetail(request, id):
    user = request.user
    if user.is_authenticated:
        note = Note.objects.filter(user=user, id=id).first()
        if note:
            serializer = NoteSerializer(note)
            return Response(serializer.data)
        return Response("Note not found", status=404)
    return Response("Unauthorized", status=401)

def createNote(request):
    data = request.data
    user = request.user
    note = Note.objects.create(body=data.get('body'), user=user)
    serializer = NoteSerializer(note)
    return Response(serializer.data, status=201)

def updateNote(request, id):
    user = request.user
    if user.is_authenticated:
        note = Note.objects.filter(user=user, id=id).first()
        if note:
            serializer = NoteSerializer(instance=note, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=400)
        return Response("Note not found", status=404)
    return Response("Unauthorized", status=401)

def deleteNote(request, id):
    user = request.user
    if user.is_authenticated:
        note = Note.objects.filter(user=user, id=id).first()
        if note:
            note.delete()
            return Response('Note was deleted')
        return Response("Note not found", status=404)
    return Response("Unauthorized", status=401)