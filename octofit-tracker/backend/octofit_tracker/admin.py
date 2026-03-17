from django.contrib import admin

from .models import (
    Activity,
    LeaderboardEntry,
    Team,
    UserProfile,
    WorkoutRecommendation,
)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'hero', 'team', 'level', 'total_points')
    search_fields = ('name', 'email', 'hero', 'team')
    list_filter = ('team',)
    ordering = ('name',)
    list_per_page = 25


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'universe', 'motto', 'total_points')
    search_fields = ('name', 'universe')
    ordering = ('name',)
    list_per_page = 25


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user_email', 'activity_type', 'duration_minutes', 'calories', 'performed_at')
    search_fields = ('user_email', 'activity_type')
    list_filter = ('activity_type',)
    ordering = ('-performed_at',)
    date_hierarchy = 'performed_at'
    list_per_page = 25


@admin.register(LeaderboardEntry)
class LeaderboardEntryAdmin(admin.ModelAdmin):
    list_display = ('rank', 'hero_name', 'team', 'score')
    search_fields = ('hero_name', 'team')
    ordering = ('rank',)
    list_per_page = 25


@admin.register(WorkoutRecommendation)
class WorkoutRecommendationAdmin(admin.ModelAdmin):
    list_display = ('user_email', 'workout_name', 'intensity', 'recommended_for', 'completed')
    search_fields = ('user_email', 'workout_name', 'recommended_for')
    list_filter = ('intensity', 'completed')
    ordering = ('user_email', 'workout_name')
    list_per_page = 25
