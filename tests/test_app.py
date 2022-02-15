import os
import tempfile
import flask_unittest
import flask.globals
from flask.testing import FlaskClient
from app import build_app

class TestApp(flask_unittest.ClientTestCase):
    app = build_app()

    def setUp(self, client):
        self.assertTrue(client is not None)
        self.assertTrue(isinstance(client, FlaskClient))

    def tearDown(self, client):
        self.assertTrue(client is not None)
        self.assertTrue(isinstance(client, FlaskClient))

    def test_setup(self, client):
        pass

    def test_index_page(self, client):
        rv: Response = client.get('/')
        self.assertEqual(rv.status_code, 200)
        rv.close()


if __name__ == '__main__':
    unittest.main()
