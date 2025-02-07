from django.db import models

# Create your models here.

class SalesData(models.Model):
    region = models.CharField(max_length=50)
    month = models.CharField(max_length=50)
    sales = models.IntegerField()

    def __str__(self):
        return f"{self.region} - {self.month}: {self.sales}" 