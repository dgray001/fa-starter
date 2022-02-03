import os
import sys
import paramiko

import flask
from flask import request

from base64 import decodebytes

blueprint = flask.Blueprint('submit', __name__, url_prefix="/submit")

ip = "34.125.77.241" # external computeengine ip
#ip = "10.182.0.2" # internal computeengine ip
keyPath = "./test"
ssh_protocol = "ssh-rsa"
projectId = "personal-fa-starter-app"
zone = "us-west4-b"

@blueprint.route("/", methods=['PATCH'])
def test():
    req = request.get_json()
    print(req)

    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_client.connect(ip, username="yodan", password="", key_filename=keyPath)
    stdin, stdout, stderr = ssh_client.exec_command("ls")

    return req
