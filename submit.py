import os
import sys
import paramiko

import flask
from flask import request

from base64 import decodebytes

blueprint = flask.Blueprint('submit', __name__, url_prefix="/submit")

ip = "34.125.77.241" # external computeengine ip
#ip = "10.182.0.2" # internal computeengine ip
keyPath = "./google_compute_engine.pub"
ssh_protocol = "ssh-rsa"


#key = paramiko.RSAKey.from_private_key(paramiko.pkey.PKey(data=decodebytes(keyData)))
key = paramiko.RSAKey(data=decodebytes(keyData))
projectId = "personal-fa-starter-app"
zone = "us-west4-b"

@blueprint.route("/", methods=['PATCH'])
def test():
    req = request.get_json()
    print(req)

    ssh_client = paramiko.SSHClient()
    ssh_client.get_host_keys().add(ip, ssh_protocol, key)
    ssh_client.connect(ip, username="client", key_filename=keyPath)
    #ssh_client.connect(ip)
    stdin, stdout, stderr = ssh_client.exec_command("ls")

    return req
