from django.contrib import admin
from .models import SalesData
from .models import PipelineData
from .models import WinroomData
from .models import StakeholderData

# Register your models here.

admin.site.register(SalesData)
admin.site.register(PipelineData)
admin.site.register(WinroomData)
admin.site.register(StakeholderData)