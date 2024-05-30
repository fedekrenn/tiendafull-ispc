from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "nro_documento",
            "telefono",
            "is_staff",
        ]


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
            "nro_documento",
            "telefono",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            nro_documento=validated_data["nro_documento"],
            telefono=validated_data["telefono"],
        )

        return user


class BrandTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BrandType
        fields = ["id", "descripcion"]


class WheelSizeTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WheelSizeType
        fields = ["id", "descripcion"]


class StyleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StyleType
        fields = ["id", "descripcion"]


class MaterialTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialType
        fields = ["id", "descripcion"]


class ColorTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColorType
        fields = ["id", "descripcion"]


class ProductSerializer(serializers.ModelSerializer):
    marca = serializers.SerializerMethodField()
    rodado = serializers.SerializerMethodField()
    estilo = serializers.SerializerMethodField()
    material = serializers.SerializerMethodField()
    color = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "modelo",
            "precio",
            "stock",
            "imagen",
            "detalle",
            "marca",
            "rodado",
            "estilo",
            "material",
            "color",
        ]

    def get_marca(self, obj):
        return obj.marca.descripcion if obj.marca else None

    def get_rodado(self, obj):
        return obj.rodado.descripcion if obj.rodado else None

    def get_estilo(self, obj):
        return obj.estilo.descripcion if obj.estilo else None

    def get_material(self, obj):
        return obj.material.descripcion if obj.material else None

    def get_color(self, obj):
        return obj.color.descripcion if obj.color else None


    
class CartDetailSerializer(serializers.ModelSerializer):
    producto = ProductSerializer()

    class Meta:
        model = CartDetail
        fields = ['id', 'carrito', 'producto', 'cantidad']  
        
  
    
class CartSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = '__all__'
        
