from django.urls import path
from .views import SimulationView

urlpatterns = [
     path('api/simulate/', SimulationView.as_view(), name='simulate'),
]

