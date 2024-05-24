from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8)

    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "password"]


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
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
    id_marca = serializers.SerializerMethodField()
    id_rodado = serializers.SerializerMethodField()
    id_estilo = serializers.SerializerMethodField()
    id_material = serializers.SerializerMethodField()
    id_color = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id",
            "modelo",
            "precio",
            "stock",
            "imagen",
            "detalle",
            "id_marca",
            "id_rodado",
            "id_estilo",
            "id_material",
            "id_color",
        ]

    def get_id_marca(self, obj):
        return obj.id_marca.descripcion if obj.id_marca else None

    def get_id_rodado(self, obj):
        return obj.id_rodado.descripcion if obj.id_rodado else None

    def get_id_estilo(self, obj):
        return obj.id_estilo.descripcion if obj.id_estilo else None

    def get_id_material(self, obj):
        return obj.id_material.descripcion if obj.id_material else None

    def get_id_color(self, obj):
        return obj.id_color.descripcion if obj.id_color else None
