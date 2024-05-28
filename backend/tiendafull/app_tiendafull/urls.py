from django.urls import path, include
from app_tiendafull import views
from rest_framework import routers
from knox import views as knox_views

router = routers.DefaultRouter()
router.register(r"products", views.ProductViewSet)
router.register(r"cart-detail", views.CartDetailViewSet, basename="cart-detail")


urlpatterns = [
    path("", include(router.urls)),
    path("login/", views.LoginView.as_view(), name="login"),
    path("logout/", knox_views.LogoutView.as_view(), name="custom_logout"),
    path("logoutall/", knox_views.LogoutAllView.as_view(), name="knox_logoutall"),
    path("register/", views.RegistroView.as_view(), name="register"),
    # path("cart-detail/", views.CartDetail.as_view(), name="cart-detail"),
]
