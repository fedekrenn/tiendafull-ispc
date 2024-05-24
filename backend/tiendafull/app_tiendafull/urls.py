from django.urls import path, include
from app_tiendafull import views
from rest_framework import routers
from knox import views as knox_views

router = routers.DefaultRouter()
router.register(r"products", views.ProductViewSet)


urlpatterns = [
    path("", include(router.urls)),
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", knox_views.LogoutView.as_view(), name="custom_logout"),
    path("logoutall/", knox_views.LogoutAllView.as_view(), name="knox_logoutall"),
    path("registro/", views.RegistroView.as_view(), name="registro"),
]
