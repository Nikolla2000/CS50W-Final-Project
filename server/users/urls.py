from django.urls import path

from . import  views

app_name = 'users'

urlpatterns = [
    path('csrf/', views.get_csrf, name='csrf'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('session/', views.session_view, name='session'),
    path('whoami/', views.whoami_view, name='whoami'),
]