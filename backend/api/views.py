from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SalesData
from .serializers import SalesDataSerializer

class SalesDataList(APIView):
    def get(self, request):
        sales_data = SalesData.objects.all()
        serializer = SalesDataSerializer(sales_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

def home(request):
    return render(request, 'home.html')