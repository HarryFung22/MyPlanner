from django.urls import path
from . import views
from .Cohere.views import getGenerate, getSummarize
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


#path method specifies the route we go to
urlpatterns = [
    path('notes/<str:user>/', views.getNotes, name="notes"),
    path('notes/<str:user>/<str:id>/', views.getNote, name="note"),
    path('summarize/', getSummarize, name='summarize'),
    path('generate/', getGenerate, name='generate'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]