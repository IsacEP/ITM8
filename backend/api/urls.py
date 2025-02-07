from django.urls import path
from . import views
from .views import SalesDataList

urlpatterns = [
    path('', views.home, name='home'),
    path('salesdata/', SalesDataList.as_view(), name='salesdata-list'),
]
