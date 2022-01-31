import os

import flask
import requests

blueprint = flask.Blueprint('submit', __name__, url_prefix="/submit")

@blueprint.route("/test/", methods=['PATCH'])
def test():
    print(request.form)
    return "hello"
