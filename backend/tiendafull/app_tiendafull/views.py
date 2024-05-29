from django.contrib.auth import login
from rest_framework import generics, permissions, viewsets, status
from knox.models import AuthToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import AllowAny
from knox.views import LoginView as KnoxLoginView
from knox.views import LogoutView as KnoxLogoutView
from knox.views import LogoutAllView as KnoxLogoutAllView
from app_tiendafull.serializers import *
from app_tiendafull.models import *
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdminOrReadOnly


class LoginView(KnoxLoginView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        user_serializer = UserSerializer(user)
        _, token = AuthToken.objects.create(user)

        return Response(
            {"user": user_serializer.data, "token": token}, status=status.HTTP_200_OK
        )


class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response(
            {
                "user": UserSerializer(
                    user, context=self.get_serializer_context()
                ).data,
                "token": AuthToken.objects.create(user)[1],
            }
        )


class LogoutView(KnoxLogoutView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        response = super().post(request, format=None)
        return Response({"success": "Logged out"}, status=response.status_code)


class LogoutAllView(KnoxLogoutAllView):
    permission_classes = [IsAdminOrReadOnly]

    def post(self, request, format=None):
        response = super().post(request, format=None)
        return Response(
            {"success": "All users are logged out"}, status=response.status_code
        )


class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]

    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CartDetailViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CartSerializer

    def get_queryset(self):
        return Cart.objects.filter(email=self.request.user)
