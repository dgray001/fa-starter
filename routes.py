"""An example 'controller' with a basic route."""
import os
import time

import flask
import logging
import requests

blueprint = flask.Blueprint('example', __name__, url_prefix="/example")


@blueprint.route("/ping", methods=['PATCH'])
def hello():
  print("ping")
  return 'pong'
