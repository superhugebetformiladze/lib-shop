# views.py
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination
from .models import Category, Order, Product
from .serializers import CategorySerializer, OrderSerializer, ProductSerializer
from django.db.models import Q
from django.db.models.functions import Lower


class ProductPagination(PageNumberPagination):
    page_size = 8
    page_size_query_param = 'page_size'
    max_page_size = 100

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('category').all().order_by('id')
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,
    ]

    filterset_fields = ['category']
    ordering_fields = ['price', 'name']
    
    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search', None)

        if search:
            search = search.lower()
            queryset = queryset.annotate(
                name_lower=Lower('name'),
                category_name_lower=Lower('category__name')
            ).filter(
                Q(name_lower__icontains=search) |
                Q(category_name_lower__icontains=search)
            )

        return queryset



class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer

    def get_queryset(self):
        user_token = self.request.query_params.get('user_token')
        if user_token:
            try:
                return Order.objects.filter(user_token=user_token).prefetch_related('items__product')
            except ValueError:
                return Order.objects.none()
        return Order.objects.none()