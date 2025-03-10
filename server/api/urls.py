from django.urls import path
from .views import Goals

app_name = 'api'

urlpatterns = [
    path("goals/", Goals.as_view(), name="goals"),
]