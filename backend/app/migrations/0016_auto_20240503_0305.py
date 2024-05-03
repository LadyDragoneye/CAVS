# Generated by Django 3.2.12 on 2024-05-03 03:05

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_auto_20240503_0238'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='end_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='note',
            name='start_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]