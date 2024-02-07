# Use an official Python image as the base image
FROM python:3.10

# Set environment variables for Python
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Set the working directory in the container
WORKDIR /app

# Copy the entire Django project directory to the working directory
COPY . .

# Install Python dependencies including Django and corsheaders
RUN pip install --no-cache-dir django django-cors-headers djangorestframework

# Expose port 8000 to the outside world
EXPOSE 8000

# Start the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
