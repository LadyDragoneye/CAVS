# Generated by Django 3.2.12 on 2024-04-27 02:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='sender_email',
            field=models.EmailField(default='', max_length=254),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='note',
            name='subject',
            field=models.CharField(default='', max_length=200),
        ),
    ]