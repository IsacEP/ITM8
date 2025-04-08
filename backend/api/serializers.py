from rest_framework import serializers
from .models import SalesData
from .models import PipelineData
from .models import WinroomData


class SalesDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesData
        fields = ['region', 'month', 'sales']

class PipelineDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = PipelineData
        fields = '__all__'
        read_only_fields = ['user']

class WinroomDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WinroomData
        fields = '__all__'
        read_only_fields = ['user']