import os

from django.contrib import admin
from django.urls import include, path
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.routers import DefaultRouter

from .views import (
    ActivityViewSet,
    LeaderboardViewSet,
    TeamViewSet,
    UserProfileViewSet,
    WorkoutViewSet,
)

codespace_name = os.environ.get('CODESPACE_NAME')
base_url = f"https://{codespace_name}-8000.app.github.dev" if codespace_name else "http://localhost:8000"


@api_view(['GET'])
def api_root(request):
    return Response({
        'users': f'{base_url}/api/users/',
        'teams': f'{base_url}/api/teams/',
        'activities': f'{base_url}/api/activities/',
        'leaderboard': f'{base_url}/api/leaderboard/',
        'workouts': f'{base_url}/api/workouts/',
    })

router = DefaultRouter()
router.register(r'users', UserProfileViewSet)
router.register(r'teams', TeamViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'leaderboard', LeaderboardViewSet)
router.register(r'workouts', WorkoutViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', api_root, name='root-api'),
    path('api/', api_root, name='api-root'),
    path('api/', include(router.urls)),
]
