from django.contrib import admin
from .models import Category, Order, OrderItem, Product

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price')
    search_fields = ('name', 'category__name')
    list_filter = ('category',)

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    can_delete = False

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user_token', 'country', 'city', 'created_at']
    search_fields = ['user_token', 'city', 'country']
    list_filter = ['created_at']
    inlines = [OrderItemInline]
    ordering = ['-created_at']