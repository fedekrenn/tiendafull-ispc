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
from rest_framework.decorators import action


class LoginView(KnoxLoginView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        user_serializer = UserSerializer(user)
        _, token = AuthToken.objects.create(user)
        isAdmin= request.user.is_staff

        return Response(
            {"user": user_serializer.data, "token": token, "is_staff":isAdmin}, status=status.HTTP_200_OK
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

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def crear_carrito(self, request):
        try:
            carrito, created = Cart.objects.get_or_create(email=request.user)
            if created:
                return Response({'message': 'Carrito creado exitosamente'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'message': 'El carrito ya existe'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['delete'])
    def delete_cart(self, request):
        try:
            carrito = Cart.objects.get(email=request.user)
            carrito.delete()
            return Response({'message': 'Carrito eliminado exitosamente'}, status=status.HTTP_204_NO_CONTENT)
        except Cart.DoesNotExist:
            return Response({'error': 'Carrito no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        
    @action(detail=False, methods=['post'])
    def agregar_producto(self, request):
        id_producto = request.data.get('id_producto')
        cantidad = request.data.get('cantidad', 1)
        try:
            print(f"User: {request.user}, Email: {request.user}") 
            carrito, _ = Cart.objects.get_or_create(email=request.user)

            producto = Product.objects.get(pk=id_producto)
            item, item_created = CartDetail.objects.get_or_create(carrito=carrito, producto=producto, defaults={'cantidad': cantidad})
            if not item_created:
                item.cantidad += int(cantidad)
            item.save()
            return Response({'message': 'Producto agregado al carrito exitosamente'})
        except Product.DoesNotExist:
            return Response({'error': 'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'])
    def items(self, request):
        try:
            carrito = Cart.objects.get(email=request.user)
            items = CartDetail.objects.filter(carrito=carrito)
            serializer = CartDetailSerializer(items, many=True)
            return Response(serializer.data)
        except Cart.DoesNotExist:
            return Response({'error': 'Carrito no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['delete'])
    def delete_item(self, request):
        item_id = request.data.get('item_id')
        try:
            item = CartDetail.objects.get(id=item_id)
            item.delete()
            return Response({'message': 'Ítem eliminado del carrito exitosamente'})
        except CartDetail.DoesNotExist:
            return Response({'error': 'Ítem no encontrado en el carrito'}, status=status.HTTP_404_NOT_FOUND)
