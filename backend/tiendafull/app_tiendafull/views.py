from django.contrib.auth import login
from rest_framework import status, generics, permissions
from knox.models import AuthToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from knox.views import LogoutView as KnoxLogoutView
from knox.views import LogoutAllView as KnoxLogoutAllView
from app_tiendafull.serializers import RegisterSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated 


class LoginView(KnoxLoginView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        return super(LoginView, self).post(request, format=None)

class RegistroView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class CustomLogoutView(KnoxLogoutView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        response = super().post(request, format=None)
        return Response({'success': 'Logout successful'}, status=response.status.HTTP_204_NO_CONTENT)

class CustomLogoutAllView(KnoxLogoutAllView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        response = super().post(request, format=None)
        return Response({'success': 'Logged out from all devices'}, status=response.HTTP_200_OK)
    