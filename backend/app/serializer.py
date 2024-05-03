# from rest_framework import serializers
# from . models import *


# class ReactSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = React # Specify the model to be serialized
#         fields = ['employee', 'department'] # Specify the fields to include in the serialization


 # "serialized" refers to the process of converting
 #  an object or data structure into a format that 
# can be easily transmitted or stored, typically for 
# purposes such as data exchange, storage, or communication over a network.


from app.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Note

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # These are claims, you can add custom claims
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['bio'] = user.profile.bio
        token['image'] = str(user.profile.image)
        token['verified'] = user.profile.verified
        # ...
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('emails', 'username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']

        )

        user.set_password(validated_data['password'])
        user.save()

        return user
    
class NoteSerializer(serializers.ModelSerializer):
    user = serializers.EmailField(source='user.email')
    recipient = serializers.EmailField(source='recipient.email')
    subject = serializers.CharField()  # Add this line to include the subject field
    class Meta:
        model = Note
        fields = ['id', 'user', 'recipient', 'subject', 'body', 'created_at', 'caseNumber', 'start_date', 'end_date', 'confirmed_attendance']


