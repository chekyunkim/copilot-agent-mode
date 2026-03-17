from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from octofit_tracker.models import (
    Activity,
    LeaderboardEntry,
    Team,
    UserProfile,
    WorkoutRecommendation,
)


class Command(BaseCommand):
    help = 'octofit_db 데이터베이스에 테스트 데이터를 입력합니다.'

    def handle(self, *args, **options):
        WorkoutRecommendation.objects.all().delete()
        Activity.objects.all().delete()
        LeaderboardEntry.objects.all().delete()
        Team.objects.all().delete()
        UserProfile.objects.all().delete()

        Team.objects.bulk_create([
            Team(name='marvel 팀', universe='Marvel', motto='Avengers Assemble', total_points=940),
            Team(name='dc 팀', universe='DC', motto='Justice for All', total_points=880),
        ])

        users = [
            UserProfile(
                name='Peter Parker',
                email='spiderman@octofit.com',
                hero='Spider-Man',
                team='marvel 팀',
                level=12,
                total_points=320,
            ),
            UserProfile(
                name='Tony Stark',
                email='ironman@octofit.com',
                hero='Iron Man',
                team='marvel 팀',
                level=15,
                total_points=410,
            ),
            UserProfile(
                name='Bruce Wayne',
                email='batman@octofit.com',
                hero='Batman',
                team='dc 팀',
                level=14,
                total_points=390,
            ),
            UserProfile(
                name='Diana Prince',
                email='wonderwoman@octofit.com',
                hero='Wonder Woman',
                team='dc 팀',
                level=13,
                total_points=350,
            ),
        ]
        UserProfile.objects.bulk_create(users)

        now = timezone.now()
        Activity.objects.bulk_create([
            Activity(
                user_email='spiderman@octofit.com',
                activity_type='HIIT Rooftop Sprint',
                duration_minutes=35,
                calories=420,
                performed_at=now - timedelta(days=1),
            ),
            Activity(
                user_email='ironman@octofit.com',
                activity_type='Arc Reactor Cardio',
                duration_minutes=28,
                calories=360,
                performed_at=now - timedelta(hours=12),
            ),
            Activity(
                user_email='batman@octofit.com',
                activity_type='Gotham Strength Circuit',
                duration_minutes=42,
                calories=510,
                performed_at=now - timedelta(days=2),
            ),
            Activity(
                user_email='wonderwoman@octofit.com',
                activity_type='Amazon Endurance Run',
                duration_minutes=40,
                calories=470,
                performed_at=now - timedelta(hours=6),
            ),
        ])

        LeaderboardEntry.objects.bulk_create([
            LeaderboardEntry(hero_name='Iron Man', team='marvel 팀', score=410, rank=1),
            LeaderboardEntry(hero_name='Batman', team='dc 팀', score=390, rank=2),
            LeaderboardEntry(hero_name='Wonder Woman', team='dc 팀', score=350, rank=3),
            LeaderboardEntry(hero_name='Spider-Man', team='marvel 팀', score=320, rank=4),
        ])

        WorkoutRecommendation.objects.bulk_create([
            WorkoutRecommendation(
                user_email='spiderman@octofit.com',
                workout_name='Wall-Crawl Core Blast',
                intensity='Medium',
                recommended_for='Agility',
                completed=False,
            ),
            WorkoutRecommendation(
                user_email='ironman@octofit.com',
                workout_name='Powered Armor Intervals',
                intensity='High',
                recommended_for='Cardio',
                completed=True,
            ),
            WorkoutRecommendation(
                user_email='batman@octofit.com',
                workout_name='Batcave Strength Protocol',
                intensity='High',
                recommended_for='Strength',
                completed=False,
            ),
            WorkoutRecommendation(
                user_email='wonderwoman@octofit.com',
                workout_name='Lasso Mobility Flow',
                intensity='Medium',
                recommended_for='Mobility',
                completed=True,
            ),
        ])

        self.stdout.write(self.style.SUCCESS('octofit_db 테스트 데이터 적재 완료'))
