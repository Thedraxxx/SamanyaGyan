from django.urls import path
from .views import Login,Register
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns=[
    path('login/',Login.as_view(),name='login'),
    path('register/',Register.as_view(),name='register'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh'),
]