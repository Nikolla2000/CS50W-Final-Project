from django.urls import path
from .views import Goals

app_name = 'api'

urlpatterns = [
    path("goals/", Goals.as_view(), name="goals"),
    path("goals/<int:goal_id>/complete/", Goals.as_view(), name="complete_goal"),
]