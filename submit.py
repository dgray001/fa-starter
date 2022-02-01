import os

import flask
from flask import request

blueprint = flask.Blueprint('submit', __name__, url_prefix="/submit")

@blueprint.route("/test/", methods=['PATCH'])
def test():
    req = request.form
    print(form.get("inputString"))
    return "hello"
