from django.urls import path
from . import views
from .views import UserNotesView
from .views import user_received_notes
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('notes/', views.create_note, name='create_note'),
    path('user/notes/', UserNotesView.as_view(), name='user_notes'),
    path('user/received_notes/', user_received_notes, name='user_received_notes'),
    path('', views.getRoutes),
]