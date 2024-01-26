import os
import tempfile
import unittest
from flaskr import create_app
from flask import json

class FlaskrTestCase(unittest.TestCase):

    def setUp(self):
        self.db_fd, self.db_path = tempfile.mkstemp()
        self.app = create_app({
            'TESTING': True,
            'DATABASE': self.db_path,
        })
        self.client = self.app.test_client()

    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(self.db_path)

    def test_hello(self):
        response = self.client.get('/hello')
        self.assertEqual(response.data, b'Hello, World!')

    def test_index(self):
        response = self.client.get('/')
        data = json.loads(response.data)
        self.assertEqual(data['Status'], 'Running')


if __name__ == '__main__':
    unittest.main()