from django.urls import path
from . import views
from .api.views import getGenerate, getSummarize


#path method specifies the route we go to
urlpatterns = [
    path('notes/<str:user>/', views.getNotes, name="notes"),
    path('notes/<str:user>/<str:id>/', views.getNote, name="note"),
    path('summarize/', getSummarize, name='summarize'),
    path('generate/', getGenerate, name='generate'),
]