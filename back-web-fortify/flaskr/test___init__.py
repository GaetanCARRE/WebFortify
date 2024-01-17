import unittest
from flask import Flask
from flask.testing import FlaskClient
from your_app import create_app

class TestApp(unittest.TestCase):
    # def setUp(self):
    #     self.app = create_app(test_config={
    #         'TESTING': True,
    #         'DATABASE': 'test_db.sqlite'
    #     })
    #     self.client = self.app.test_client()

    # def tearDown(self):
    #     # Supprimer la base de données de test
    #     # si nécessaire
    #     pass

    def test_hello(self):
        response = self.client.get('/hello')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode(), 'Hello, World!')

    def test_index(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertEqual(json_data['Status'], 'Running')

    def test_dirsearch(self):
        response = self.client.post('/dirsearch', json={'url': 'https://example.com'})
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, list)

    def test_xsstrike(self):
        response = self.client.post('/xsstrike', json={'cookie': 'session=123', 'url': 'https://example.com'})
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, list)

    def test_sqlmap(self):
        response = self.client.post('/sqlmap', json={'url': 'https://example.com', 'options': '--level=5'})
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, dict)

    def test_bruteforce(self):
        response = self.client.post('/bruteforce', json={'url': 'https://example.com', 'cookie': 'session=123'})
        self.assertEqual(response.status_code, 200)
        json_data = response.get_json()
        self.assertIsInstance(json_data, dict)

if __name__ == '__main__':
    unittest.main()