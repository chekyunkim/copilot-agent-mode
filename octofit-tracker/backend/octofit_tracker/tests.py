from django.test import TestCase
from rest_framework.test import APIClient


class CollectionEndpointTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_api_root_returns_all_collection_links(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, 200)

        payload = response.json()
        self.assertIn('users', payload)
        self.assertIn('teams', payload)
        self.assertIn('activities', payload)
        self.assertIn('leaderboard', payload)
        self.assertIn('workouts', payload)

    def test_collection_endpoints_are_available(self):
        endpoints = [
            '/api/users/',
            '/api/teams/',
            '/api/activities/',
            '/api/leaderboard/',
            '/api/workouts/',
        ]

        for endpoint in endpoints:
            response = self.client.get(endpoint)
            self.assertEqual(
                response.status_code,
                200,
                msg=f'Expected HTTP 200 from {endpoint}, got {response.status_code}',
            )
