from django.http import response
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import Serializer
from .models import Note
from .serializers import NoteSerializer
from backend import serializers
from .utils import updateNote, getNoteDetail, deleteNote, getNotesList, createNote
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# specifies endpoints

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getNotes(request, user):
    if request.method == 'GET':
        return getNotesList(request, user) 
    
    if request.method == 'POST':

        return createNote(request, user)
    
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def getNote(request, user, id):
    if request.method == 'GET':
        return getNoteDetail(request, user, id)
    
    if request.method == 'PUT':
        return updateNote(request, user, id)
    
    if request.method == 'DELETE':
        return deleteNote(request, user, id)
    
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # encrypt username into token
        token['username'] = user.username 

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer