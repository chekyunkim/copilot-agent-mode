from rest_framework import viewsets

from .models import (
    Activity,
    LeaderboardEntry,
    Team,
    UserProfile,
    WorkoutRecommendation,
)
from .serializers import (
    ActivitySerializer,
    LeaderboardEntrySerializer,
    TeamSerializer,
    UserProfileSerializer,
    WorkoutRecommendationSerializer,
)


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all().order_by('name')
    serializer_class = UserProfileSerializer


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by('name')
    serializer_class = TeamSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all().order_by('-performed_at')
    serializer_class = ActivitySerializer


class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = LeaderboardEntry.objects.all().order_by('rank')
    serializer_class = LeaderboardEntrySerializer


class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = WorkoutRecommendation.objects.all().order_by('user_email', 'workout_name')
    serializer_class = WorkoutRecommendationSerializer