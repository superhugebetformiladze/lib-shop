# Generated by Django 5.2 on 2025-05-09 20:32

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_alter_order_options_remove_order_house_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='user_token',
            field=models.UUIDField(db_index=True, default=uuid.uuid4, editable=False),
        ),
    ]
