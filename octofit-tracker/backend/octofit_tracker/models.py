from django.db import models


class UserProfile(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    hero = models.CharField(max_length=100)
    team = models.CharField(max_length=50)
    level = models.IntegerField(default=1)
    total_points = models.IntegerField(default=0)

    class Meta:
        db_table = 'users'
        ordering = ['name']

    def __str__(self):
        return f'{self.name} ({self.hero})'


class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    universe = models.CharField(max_length=20)
    motto = models.CharField(max_length=255)
    total_points = models.IntegerField(default=0)

    class Meta:
        db_table = 'teams'
        ordering = ['name']

    def __str__(self):
        return self.name


class Activity(models.Model):
    user_email = models.EmailField()
    activity_type = models.CharField(max_length=100)
    duration_minutes = models.IntegerField()
    calories = models.IntegerField()
    performed_at = models.DateTimeField()

    class Meta:
        db_table = 'activities'
        ordering = ['-performed_at']

    def __str__(self):
        return f'{self.user_email} - {self.activity_type}'


class LeaderboardEntry(models.Model):
    hero_name = models.CharField(max_length=100)
    team = models.CharField(max_length=50)
    score = models.IntegerField()
    rank = models.IntegerField()

    class Meta:
        db_table = 'leaderboard'
        ordering = ['rank']

    def __str__(self):
        return f'#{self.rank} {self.hero_name}'


class WorkoutRecommendation(models.Model):
    user_email = models.EmailField()
    workout_name = models.CharField(max_length=100)
    intensity = models.CharField(max_length=20)
    recommended_for = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)

    class Meta:
        db_table = 'workouts'
        ordering = ['user_email', 'workout_name']

    def __str__(self):
        return f'{self.user_email} - {self.workout_name}'