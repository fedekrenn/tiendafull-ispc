from django.urls import path, include
from app_tiendafull import views
from rest_framework import routers

router=routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls) ),
    path('login/', views.LoginView.as_view(), name="login"),
    path('logout/', views.CustomLogoutView.as_view(), name='custom_logout'),
    path('logoutall/', views.CustomLogoutAllView.as_view(), name='custom_logoutall'),
    path('registro/', views.RegistroView.as_view(), name="registro"),
]
