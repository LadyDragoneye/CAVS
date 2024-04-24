# from rest_framework.views import APIView

# # from app.serializer import ReactSerializer
# from . models import *
# from . serializer import *
# from rest_framework.response import Response
# # Create your views here.


# class ReactView(APIView):

#     serializer_class = ReactSerializer

#     def get(self, request):
#         output = [{"employee": output.employee, "department": output.department}
#                   for output in React.objects.all()] # Get all instances of the React model and construct output data
#         return Response(output) # Return a response containing the output data

#     def post(self, request):

#         serializer = ReactSerializer(data=request.data) # Create a serializer instance with request data
#         if serializer.is_valid(raise_exception=True): # Check if the data passed to the serializer is valid
#             serializer.save() # Save the data to the database
#             return Response(serializer.data) # Return a response with serialized data
from django.shortcuts import render
from django.http import JsonResponse
from app.models import User

from app.serializer import MyTokenObtainPairSerializer, RegisterSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from .models import Note
from .serializer import NoteSerializer  # Assuming you have a serializer for Note model
from rest_framework.views import APIView
from .models import Note  # Import your Note model


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class UserNotesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        notes = Note.objects.filter(user=user)
        serialized_notes = [{'id': note.id, 'body': note.body} for note in notes]
        return Response(serialized_notes)


# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/app/token/',
        '/app/register/',
        '/app/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_note(request):
    if request.method == 'POST':
        user_email = request.user.email
        recipient_email = request.data.get('recipient')  # Assuming recipient email is sent in request data
        user = get_object_or_404(User, email=user_email)
        recipient = get_object_or_404(User, email=recipient_email)
        body = request.data.get('body', '')
        if body:
            note = Note.objects.create(user=user, recipient=recipient, body=body)
            serializer = NoteSerializer(note)
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse({'error': 'Body of the note is required.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'error': 'Only POST method is allowed.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_notes(request):
    if request.method == 'GET':
        user = request.user
        notes = Note.objects.filter(recipient=user)
        serialized_notes = NoteSerializer(notes, many=True).data
        return Response(serialized_notes)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_received_notes(request):
    user = request.user
    received_notes = Note.objects.filter(recipient=user)
    serializer = NoteSerializer(received_notes, many=True)
    return Response(serializer.data)
