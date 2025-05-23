# Generated by Django 5.2 on 2025-05-10 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_order_user_token'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='phone',
            field=models.CharField(blank=True, max_length=15, verbose_name='Телефон'),
        ),
        migrations.AlterField(
            model_name='order',
            name='city',
            field=models.CharField(max_length=255, verbose_name='Город'),
        ),
        migrations.AlterField(
            model_name='order',
            name='country',
            field=models.CharField(max_length=255, verbose_name='Страна'),
        ),
        migrations.AlterField(
            model_name='order',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Дата'),
        ),
        migrations.AlterField(
            model_name='order',
            name='name',
            field=models.CharField(max_length=255, verbose_name='Покупатель'),
        ),
        migrations.AlterField(
            model_name='order',
            name='user_token',
            field=models.UUIDField(db_index=True, editable=False, null=True, verbose_name='Токен покупателя'),
        ),
    ]
