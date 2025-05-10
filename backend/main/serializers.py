# serializers.py
import uuid
from rest_framework import serializers
from .models import Order, OrderItem, Product, Category

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
        fields = ['user_token', 'name', 'country', 'city', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        user_token = validated_data.get('user_token')

        # Проверка — если не пришёл, генерируем
        if not user_token:
            user_token = uuid.uuid4()
            validated_data['user_token'] = user_token

        order = Order.objects.create(**validated_data)
        for item in items_data:
            OrderItem.objects.create(order=order, **item)

        self.context['new_user_token'] = str(user_token)
        return order

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['items'] = OrderItemReadSerializer(instance.items.all(), many=True).data

        if 'new_user_token' in self.context:
            rep['user_token'] = self.context['new_user_token']
        return rep