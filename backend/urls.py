from django.urls import path
from . import views

#path method specifies the route we go to
urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('notes/', views.getNotes, name="notes"),
    path('notes/<str:id>', views.getNote, name="note"),
]