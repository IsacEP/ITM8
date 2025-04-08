from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Project(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

class PipelineData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pipelines')
    name = models.CharField(max_length=255)
    budget = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    sellCycleLength = models.IntegerField(default=0)
    avgOpportunitySize = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    monthsLeft = models.IntegerField(default=0)
    yearToDateAttainment = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    identifyRevenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    qualifyRevenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    validateRevenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    proveRevenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    presentRevenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    closeRevenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class WinroomData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='winrooms')
    name = models.CharField(max_length=255, default="Unnamed Salesman")
    reviews = models.JSONField(default=list, blank=True)
    description = models.TextField(blank=True, default="")
    responsible = models.CharField(max_length=255, blank=True, default="")
    deadline = models.DateField(null=True, blank=True)
    budget = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_pipeline_value = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    closed_value = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    opportunity_gap = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    pipeline_gap = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    rowers_values = models.JSONField(default=list, blank=True)
    activities = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
class StakeholderData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='stakeholderdata')
    name = models.CharField(max_length=255, default="Unnamed Stakeholder Map")
    stakeholders = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name

class SalesData(models.Model):
    region = models.CharField(max_length=50)
    month = models.CharField(max_length=50)
    sales = models.IntegerField()

    def __str__(self):
        return f"{self.region} - {self.month}: {self.sales}" 