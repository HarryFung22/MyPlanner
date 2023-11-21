from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


#path method specifies the route we go to
urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('notes/', views.getNotes, name="notes"),
    path('notes/<str:id>/', views.getNote, name="note"),

    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]