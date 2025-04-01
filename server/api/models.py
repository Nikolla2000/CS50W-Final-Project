from django.db import models
from users.models import User

# Create your models here.
class Goal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='goals')
    description = models.CharField(max_length=200)
    start_date = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()
    is_completed = models.BooleanField(blank=True, null=True, default=False)

    def __str__(self):
        return f"{self.description} until {self.deadline}"
    

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    description = models.CharField(max_length=200)
    date = models.DateField(auto_now_add=True)
    is_completed = models.BooleanField(blank=True, null=True, default=False)

    def __str__(self):
        return f"{self.date}: {self.description}"


class FocusTimerRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="focus_records")
    duration = models.DurationField(help_text="Best focus time in HH:MM:SS format")

    class Meta:
        verbose_name = "Focus Record"
        verbose_name_plural = "Focus Records"
    
    def __str__(self):
        return f"{self.user} record: {self.duration}"