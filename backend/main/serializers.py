import uuid
from rest_framework import serializers
from .models import Order, OrderItem, Product, Category
from django.conf import settings
from telegram import Bot
import asyncio

# Инициализация бота
bot = Bot(token=settings.TELEGRAM_BOT_TOKEN)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']

class OrderItemReadSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = ['product', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    user_token = serializers.UUIDField(required=False, allow_null=True)
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['user_token', 'name', 'phone', 'created_at', 'country', 'city', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user_token = validated_data.get('user_token')

        # Проверка — если не пришёл, генерируем
        if not user_token:
            user_token = uuid.uuid4()
            validated_data['user_token'] = user_token

        # Создание заказа
        order = Order.objects.create(**validated_data)
        for item in items_data:
            OrderItem.objects.create(order=order, **item)

        self.context['new_user_token'] = str(user_token)

        # Формируем сообщение для Telegram
        message_text = (
            f"Новый заказ!\n\n"
            f"Имя: {order.name}\n"
            f"Телефон: {order.phone}\n"
            f"Страна: {order.country}\n"
            f"Город: {order.city}\n"
            f"Товары:\n" + "\n".join([f"- {item.product.name} — {item.quantity} шт." for item in order.items.all()])
        )

        # Отправка сообщения в Telegram
        chat_id = settings.TELEGRAM_CHAT_ID  # Телеграм ID чата, куда нужно отправить сообщение

        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(bot.send_message(chat_id, message_text))

        return order

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['items'] = OrderItemReadSerializer(instance.items.all(), many=True).data

        if 'new_user_token' in self.context:
            rep['user_token'] = self.context['new_user_token']
        return rep
