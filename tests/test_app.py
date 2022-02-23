#include "Python.h"
import os
import sys
import tempfile
from paramiko import SSHClient as ssh
from paramiko.sftp_client import SFTPClient as sftp
from io import StringIO
import paramiko
import flask_unittest
from unittest.mock import MagicMock, patch
import flask.globals
from flask.testing import FlaskClient
from app import build_app




class MockSSHClient(object):
    def __init__(self):
        sys.stdout.channel = MagicMock()
        sys.stdout.read = MagicMock(return_value = b"""Mock Output""")
        sys.stderr.read = MagicMock(return_value = b"""Mock Error""")
        sftp.file = MagicMock(spec = StringIO)

    def set_missing_host_key_policy(self, policy):
        pass

    # assume the connection is made
    def connect(self, ip, port=22, username=None, password=None, key_filename=None):
        pass

    # return local sys.std streams
    def exec_command(self, command):
        return (sys.stdin, sys.stdout, sys.stderr)

    def open_sftp(self):
        return MagicMock(spec = sftp)

    def close(self):
        pass



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
        response: Response = client.get('/')
        self.assertEqual(rv.status_code, 200)
        response.close()

    @patch.object(paramiko, "SSHClient", MagicMock(return_value = MockSSHClient()))
    def test_submit_route(self, client):
        mockData = {"inputString": "Mock input", "inputFormat": "Mock input format", "outputFormat": "Mock output format", "additionalOptions": "Mock additional options", "output": "", "log": "" }
        response: Response = client.patch('/submit', json = mockData, follow_redirects = True)
        paramiko.SSHClient.assert_called_once()
        self.assertEqual(rv.status_code, 200)
        self.assertIn("Mock Output", rv.get_data().decode())
        response.close()


if __name__ == '__main__':
    unittest.main()
