from django.urls import path
from . import views

#path method specifies the route we go to
urlpatterns = [
    path('', views.getRoutes, name="routes")
]