from django.urls import path
from .views import ChatWithProductino

app_name = "productino"

urlpatterns = [
  path("chat/", ChatWithProductino.as_view(), name="chat"),
]

