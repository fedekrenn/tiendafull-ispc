from rest_framework import serializers
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8)
  
    class Meta:
        model = CustomUser
        fields = [ "id",'username', 'email', 'password']
    
   

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [ "id",'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        user =CustomUser.objects.create_user (validated_data['username'],validated_data['email'],validated_data['password'], )

        return user
