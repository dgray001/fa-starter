import os

import flask

blueprint = flask.Blueprint('routes', __name__, url_prefix="/submit")

@blueprint.route("/test/<data>")
def test():
    print(data)
    return "hello"
