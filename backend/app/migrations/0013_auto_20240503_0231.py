# Generated by Django 3.2.12 on 2024-05-03 02:31

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_remove_note_trial_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='end_date',
        ),
        migrations.RemoveField(
            model_name='note',
            name='start_date',
        ),
        migrations.AddField(
            model_name='note',
            name='date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
