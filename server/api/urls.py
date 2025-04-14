from django.urls import path
from .views import Goals
from .tasks_views import Tasks, TaskDetailView, TaskCount
from .focus_timer_views import FocusTimerView

app_name = 'api'

urlpatterns = [
    path("goals/", Goals.as_view(), name="goals"),
    path("goals/<int:goal_id>/complete/", Goals.as_view(), name="complete_goal"),

    path("tasks/", Tasks.as_view(), name="tasks"),
    path("tasks/<int:task_id>/", TaskDetailView.as_view(), name="task-detail"),
    path("tasks/count/", TaskCount.as_view(), name="tasks-count"),

    path("focusTimer/", FocusTimerView.as_view(), name="focus_timer"),
]