from rest_framework.views import APIView

# from app.serializer import ReactSerializer
from . models import *
from . serializer import *
from rest_framework.response import Response
# Create your views here.


class ReactView(APIView):

    serializer_class = ReactSerializer

    def get(self, request):
        output = [{"employee": output.employee, "department": output.department}
                  for output in React.objects.all()] # Get all instances of the React model and construct output data
        return Response(output) # Return a response containing the output data

    def post(self, request):

        serializer = ReactSerializer(data=request.data) # Create a serializer instance with request data
        if serializer.is_valid(raise_exception=True): # Check if the data passed to the serializer is valid
            serializer.save() # Save the data to the database
            return Response(serializer.data) # Return a response with serialized data