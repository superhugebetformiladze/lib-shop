# Generated by Django 5.2 on 2025-05-09 20:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_order_alter_category_options_alter_product_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='order',
            options={'verbose_name': 'Заказ', 'verbose_name_plural': 'Заказы'},
        ),
        migrations.RemoveField(
            model_name='order',
            name='house',
        ),
        migrations.RemoveField(
            model_name='order',
            name='street',
        ),
    ]
