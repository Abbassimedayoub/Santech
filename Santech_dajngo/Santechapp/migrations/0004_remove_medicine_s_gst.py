# Generated by Django 5.0.6 on 2024-06-23 11:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Santechapp', '0003_customerrequest_prescription'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='medicine',
            name='s_gst',
        ),
    ]
