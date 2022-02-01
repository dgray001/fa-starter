import os

import flask
from flask import request

#import google.cloud_v1 as compute_v1

blueprint = flask.Blueprint('submit', __name__, url_prefix="/submit")

blankData = {"inputString": "input", "inputFormat": "inputFormat", "outputFormat": "outputFormat", "additionalOptions": "flags", "output": "output", "log": ""}

projectId = "personal-fa-starter-app"
zone = "us-west4-b"

@blueprint.route("/test/", methods=['PATCH'])
def test():
    req = request.get_json()
    print(req)
 #   instance_client = compute_v1.InstanceClient()

    return req
