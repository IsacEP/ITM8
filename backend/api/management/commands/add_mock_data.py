from django.core.management.base import BaseCommand
from api.models import SalesData

regions = ['North', 'South', 'East', 'West']
months = ['January', 'February', 'March', 'April', 'May', 'June', 
          'July', 'August', 'September', 'October', 'November', 'December']

class Command(BaseCommand):
    help = 'Add mock sales data to the database'

    def handle(self, *args, **kwargs):
        # Optionally clear existing data
        SalesData.objects.all().delete()

        # Generate and insert mock data
        for region in regions:
            for month in months:
                sales_value = round(1000 + (500 * (regions.index(region) + 1) * (months.index(month) + 1) / 12), 2)  # Generate mock sales
                SalesData.objects.create(region=region, month=month, sales=sales_value)
        
        self.stdout.write(self.style.SUCCESS('Successfully added mock data!'))
