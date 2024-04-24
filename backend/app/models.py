# from django.db import models

# # Create your models here.
# class React(models.Model):
#   employee = models.CharField(max_length=30)
#   department = models.CharField(max_length=200)




from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User
from django.utils import timezone

class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


    def profile(self):
        profile = Profile.objects.get(user=self)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=1000)
    bio = models.CharField(max_length=100)
    image = models.ImageField(upload_to="user_images", default="default.jpg")
    verified = models.BooleanField(default=False)


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_notes', default=1)
    recipient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_notes', null=True)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

def __str__(self):
    sender = self.user.username if self.user else "Unknown"
    recipient = self.recipient.username if self.recipient else "Unknown"
    return f"From: {sender}, To: {recipient}"
