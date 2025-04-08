from django.shortcuts import render
from .models import SalesData
from .serializers import SalesDataSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from .serializers import PipelineDataSerializer
from rest_framework import generics, permissions
from .models import PipelineData
from .models import WinroomData
from .serializers import WinroomDataSerializer
from .models import StakeholderData
from .serializers import StakeholderDataSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        print("Login attempt:", request.data)
        user = authenticate(username=username, password=password)
        if user:
            if not user.is_active:
                return Response({"error": "User not approved"}, status=status.HTTP_401_UNAUTHORIZED)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if User.objects.filter(username=username).exists():
            return Response({"error": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=username, password=password, is_active=False)
        return Response({"message": "User created, pending admin approval."}, status=status.HTTP_201_CREATED)
    

class PipelineDataListCreateView(generics.ListCreateAPIView):
    serializer_class = PipelineDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PipelineData.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PipelineDataDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PipelineDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return PipelineData.objects.filter(user=self.request.user)
    
class WinroomDataListCreateView(generics.ListCreateAPIView):
    serializer_class = WinroomDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WinroomData.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WinroomDataDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = WinroomDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WinroomData.objects.filter(user=self.request.user)

class StakeholderDataListCreateView(generics.ListCreateAPIView):
    serializer_class = StakeholderDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return StakeholderData.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class StakeholderDataDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StakeholderDataSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return StakeholderData.objects.filter(user=self.request.user)

class SalesDataList(APIView):
    def get(self, request):
        sales_data = SalesData.objects.all()
        serializer = SalesDataSerializer(sales_data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

def home(request):
    return render(request, 'home.html')