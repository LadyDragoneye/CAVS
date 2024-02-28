from rest_framework import serializers
from . models import *


class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item # Specify the model to be serialized
        fields = ['employee', 'department'] # Specify the fields to include in the serialization


 # "serialized" refers to the process of converting
 #  an object or data structure into a format that 
# can be easily transmitted or stored, typically for 
# purposes such as data exchange, storage, or communication over a network.