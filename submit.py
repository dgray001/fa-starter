import os
import sys
import paramiko

import flask
from flask import request

from shlex import quote

blueprint = flask.Blueprint('submit', __name__, url_prefix="/submit")

ip = "10.168.0.42"
keyPath = "./obabel-key"

@blueprint.route("/", methods=['PATCH'])
def submit():
    req = request.get_json()
    inputFormat = req['inputFormat'].split('--')[0].strip()
    outputFormat = req['outputFormat'].split('--')[0].strip()
    inputFilename = "job/input." + inputFormat
    obabelCommand = quote("obabel -i " + inputFormat + " " + inputFilename + " -o " + outputFormat + " " + req['additionalOptions'])

    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh_client.connect(ip, username="yodan", password="", key_filename=keyPath)
    ssh_client.exec_command("mkdir job")

    ftp = ssh_client.open_sftp()
    inputFile = ftp.file(inputFilename, 'w')

    inputFile.write(req['inputString'])
    inputFile.flush()
    ftp.close()

    stdin, stdout, stderr = ssh_client.exec_command(obabelCommand)
    while not ssh_client.channel.exit_status_ready():
        continue
    out_exit_status = stdout.channel.recv_exit_status()
    output = stdout.read().decode()
    error = stderr.read().decode()
    if out_exit_status == 0:
        if "1 molecule converted" in error:
            req['output'] = output
        else:
            req['output'] = error + "\n\n" + output
    else:
        req['output'] = error + "\n\n" + output

    ssh_client.exec_command("rm -r job/")
    ssh_client.close()

    return req
