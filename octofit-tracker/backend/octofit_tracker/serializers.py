from rest_framework import serializers

from .models import (
    Activity,
    LeaderboardEntry,
    Team,
    UserProfile,
    WorkoutRecommendation,
)


class StringIdModelSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField(read_only=True)

    def get_id(self, obj):
        return str(obj.pk)


class UserProfileSerializer(StringIdModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'name', 'email', 'hero', 'team', 'level', 'total_points')


class TeamSerializer(StringIdModelSerializer):
    class Meta:
        model = Team
        fields = ('id', 'name', 'universe', 'motto', 'total_points')


class ActivitySerializer(StringIdModelSerializer):
    class Meta:
        model = Activity
        fields = (
            'id',
            'user_email',
            'activity_type',
            'duration_minutes',
            'calories',
            'performed_at',
        )


class LeaderboardEntrySerializer(StringIdModelSerializer):
    class Meta:
        model = LeaderboardEntry
        fields = ('id', 'hero_name', 'team', 'score', 'rank')


class WorkoutRecommendationSerializer(StringIdModelSerializer):
    class Meta:
        model = WorkoutRecommendation
        fields = ('id', 'user_email', 'workout_name', 'intensity', 'recommended_for', 'completed')