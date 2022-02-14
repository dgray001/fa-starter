import os
import tempfile
import flask_unittest
import flask.globals
from app import build_app

class TestApp(flask_unittest.ClientTestCase):
    app = build_app()

    def test_index_page(self, client):
        rv = client.get('/')
        self.assertEqual(rv.status_code, 200)


if __name__ == '__main__':
    unittest.main()
