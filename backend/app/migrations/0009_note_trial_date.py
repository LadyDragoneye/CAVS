# Generated by Django 3.2.12 on 2024-04-30 19:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_alter_note_subject'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='trial_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
