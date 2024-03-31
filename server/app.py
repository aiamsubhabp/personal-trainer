from config import app, db, api
from flask import Flask, make_response, session, request, jsonify
from flask_migrate import Migrate
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app

from models import Client, WorkoutProgram, Session

if __name__ == "__main__":
  app.run(port=5555, debug=True)
