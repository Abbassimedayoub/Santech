# Generated by Django 5.0.6 on 2024-06-23 13:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Santechapp', '0004_remove_medicine_s_gst'),
    ]

    operations = [
        migrations.RenameField(
            model_name='medicine',
            old_name='TVA',
            new_name='tva',
        ),
    ]
