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
        fields = '__all__'


class TeamSerializer(StringIdModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'


class ActivitySerializer(StringIdModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'


class LeaderboardEntrySerializer(StringIdModelSerializer):
    class Meta:
        model = LeaderboardEntry
        fields = '__all__'


class WorkoutRecommendationSerializer(StringIdModelSerializer):
    class Meta:
        model = WorkoutRecommendation
        fields = '__all__'