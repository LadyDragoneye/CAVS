from django.http import JsonResponse
import boto3
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.middleware.csrf import get_token

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrftoken': csrf_token})


def initialize_dynamodb_client():
    # Initialize and return the DynamoDB client using the provided AWS credentials and region
    return boto3.client(
        'dynamodb',
        region_name=settings.AWS_REGION,
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY
    )
def register(request):
    if request.method == 'POST':
        # Extract registration data from the POST request
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Hash the password
        hashed_password = make_password(password)

        # Initialize DynamoDB client
        dynamodb_client = initialize_dynamodb_client()

        try:
            # Check if the user already exists
            if user_exists(username, email):
                return JsonResponse({'error': 'Username or email already exists'}, status=400)

            # Store the user data in DynamoDB
            dynamodb_client.put_item(
                TableName=settings.DYNAMODB_TABLE_NAME,
                Item={
                    'username': {'S': username},
                    'email': {'S': email},
                    'password': {'S': hashed_password}
                }
            )

            return JsonResponse({'message': 'User registered successfully'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

def user_exists(username, email):
    # Check if the user already exists in the database
    dynamodb_client = initialize_dynamodb_client()
    response = dynamodb_client.query(
        TableName=settings.DYNAMODB_TABLE_NAME,
        IndexName='username_index',  # Assuming you have a secondary index on the username attribute
        KeyConditionExpression='username = :username',
        ExpressionAttributeValues={':username': {'S': username}}
    )
    if response['Count'] > 0:
        return True

    response = dynamodb_client.query(
        TableName=settings.DYNAMODB_TABLE_NAME,
        IndexName='email_index',  # Assuming you have a secondary index on the email attribute
        KeyConditionExpression='email = :email',
        ExpressionAttributeValues={':email': {'S': email}}
    )
    if response['Count'] > 0:
        return True

    return False

def print_items(request):
    # Initialize DynamoDB client
    dynamodb_client = initialize_dynamodb_client()

    try:
        # Retrieve all items from DynamoDB table
        response = dynamodb_client.scan(TableName=settings.DYNAMODB_TABLE_NAME)

        # Extract items from the response
        items = response.get('Items', [])

        # Convert DynamoDB items to a more usable format
        formatted_items = []
        for item in items:
            formatted_item = {}
            for key, value in item.items():
                # Extract attribute value based on the attribute type
                formatted_item[key] = list(value.values())[0]
            formatted_items.append(formatted_item)

        # Return items as JSON response
        return JsonResponse({'items': formatted_items})
    except Exception as e:
        # Handle any exceptions that might occur during DynamoDB interaction
        return JsonResponse({'error': str(e)}, status=500)
