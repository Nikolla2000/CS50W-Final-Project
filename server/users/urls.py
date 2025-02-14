from django.urls import path
from . import views

app_name = "users"

urlpatterns = [
    path("/login", views.login_view, name="api_login"),
    path("/logout", views.logout_view, name="api_logout"),
    path("/session", views.login_view, name="api_session"),
    path("/get_username", views.login_view, name="api_get_username")
]