
from django.contrib.auth import login
from rest_framework import status, generics, permissions
from knox.models import AuthToken
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from knox.auth import TokenAuthentication
from app_tiendafull.serializers import RegisterSerializer, UserSerializer

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

class CustomLogoutView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request, format=None):
        user = request.user
        request.auth.delete()
        return Response({"message": f"Logout exitoso, {user.email}"}, status=status.HTTP_200_OK)


class CustomLogoutAllView(APIView):
    authentication_classes = [TokenAuthentication]

    def post(self, request, format=None):
        # Borrar todos los tokens de autenticación del usuario
        user = request.user
        tokens = AuthToken.objects.filter(user=user)
        for token in tokens:
            token.delete()
        return Response({"message": f"Logout de todas las sesiones exitoso {user.email}"}, status=status.HTTP_200_OK)
