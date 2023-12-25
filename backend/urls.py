from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


#path method specifies the route we go to
urlpatterns = [
    path('notes/<str:user>/', views.getNotes, name="notes"),
    path('notes/<str:user>/<str:id>/', views.getNote, name="note"),
<<<<<<< HEAD
    path('summarize/', getSummarize, name='summarize'),
    path('generate/', getGenerate, name='generate'),
=======
    path('summarize/', views.getSummarize, name='summarize'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
>>>>>>> parent of b980dbc (cohere generate and summarize views)
]