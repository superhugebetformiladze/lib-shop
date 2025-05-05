from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True, verbose_name="Название категории")
    description = models.TextField(blank=True, verbose_name="Описание")
    image = models.ImageField(upload_to="categories/", blank=True, null=True, verbose_name="Изображение")

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название продукта")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products", verbose_name="Категория")
    description = models.TextField(blank=True, verbose_name="Описание")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Цена")
    image = models.ImageField(upload_to="products/", blank=True, null=True, verbose_name="Изображение")

    def __str__(self):
        return self.name