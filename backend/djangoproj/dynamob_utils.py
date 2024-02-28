# dynamodb_utils.py

import boto3
from django.conf import settings

def initialize_dynamodb_client():
    """
    Initialize Boto3 DynamoDB client.
    """
    dynamodb_client = boto3.client(
        'dynamodb',
        region_name=settings.AWS_REGION,
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
    )
    return dynamodb_client
