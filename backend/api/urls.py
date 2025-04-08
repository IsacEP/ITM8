from django.urls import path
from . import views
from .views import SalesDataList
from .views import RegisterView, LoginView
from .views import (
    LoginView, RegisterView, 
    PipelineDataListCreateView, PipelineDataDetailView
)

urlpatterns = [
    path('', views.home, name='home'),
    path("register/", views.RegisterView.as_view(), name="register"),
    path("login/", views.LoginView.as_view(), name="login"),
    path('salesdata/', views.SalesDataList.as_view(), name='salesdata-list'),
    path("pipeline/", views.PipelineDataListCreateView.as_view(), name="pipeline-list-create"),
    path("pipeline/<int:pk>/", views.PipelineDataDetailView.as_view(), name="pipeline-detail"),
    path("winroom/", views.WinroomDataListCreateView.as_view(), name="winroom-list-create"),
    path("winroom/<int:pk>/", views.WinroomDataDetailView.as_view(), name="winroom-detail"),
    path("stakeholder/", views.StakeholderDataListCreateView.as_view(), name="stakeholder-list-create"),
    path("stakeholder/<int:pk>/", views.StakeholderDataDetailView.as_view(), name="stakeholder-detail"),
]
