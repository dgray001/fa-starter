import os

import flask
from flask import request

blueprint = flask.Blueprint('submit', __name__, url_prefix="/submit")

blankData = {"inputString": "input", "inputFormat": "inputFormat", "outputFormat": "outputFormat", "additionalOptions": "flags", "output": "output", "log": ""}

@blueprint.route("/test/", methods=['PATCH'])
def test():
    req = request.form
    print(req)
    return blankData
