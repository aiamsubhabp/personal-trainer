from config import app, db, api
from flask import Flask, make_response, session, request, jsonify
from flask_migrate import Migrate
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app

from models import Client, WorkoutProgram, Session, User

@app.before_request
def check_if_logged_in():
  open_access_list = [
    'signup',
    'login',
    'check_session'
  ]

  if (request.endpoint) not in open_access_list and (not session.get('user_id')):
    return {'error': '401 Unauthorized'}, 401
  
class Signup(Resource):
  def post(self):

    request_json = request.get_json()

    username = request_json.get('username')
    password = request_json.get('password')

    user = User(
      username = username
    )

    user.password_hash = password

    try:
      db.session.add(user)
      db.session.commit()

      session['user_id'] = user.id
      return user.to_dict(), 201
    
    except IntegrityError:
      return {'error': '422 Unprocessable Entity'}, 422
    
api.add_resource(Signup, '/api/signup', endpoint = 'signup')

class CheckSession(Resource):
  def get(self):
    if session.get('user_id'):
      user = User.query.filter(User.id == session['user_id']).first()

      return user.to_dict(), 200
    
    return {'error': '401 Unauthorized'}, 401
  
api.add_resource(CheckSession, '/api/check_session', endpoint = 'check_session')

class Login(Resource):
  def post(self):
    request_json = request.get_json()

    username = request_json.get('username')
    password = request_json.get('password')

    user = User.query.filter(User.username == username).first()
    if user:
      if user.authenticate(password):
        session['user_id'] = user.id
        return user.to_dict(), 200
    return {'error': '401 Unauthorized'}, 401
  
api.add_resource(Login, '/api/login', endpoint = 'login')

class Logout(Resource):
  def delete(self):
    session['user_id'] = None
    return {}, 204
  
api.add_resource(Logout, '/api/logout', endpoint = 'logout')

class Clients(Resource):
  def get(self):
    clients = Client.query.all()
    clients_dict = [client.to_dict() for client in clients]

    return clients_dict, 200
  
  def post(self):
    data = request.get_json()

    new_client = Client(
      name = data['name'],
      age = data['age'],
      weight = data['weight'],
      goals = data['goals'],
      image = data['image']
    )

    try:
      db.session.add(new_client)
      db.session.commit()
      return make_response(new_client.to_dict(), 201)
    except:
      return 'Failed to create new client', 400
    
api.add_resource(Clients, '/api/clients')

class ClientsById(Resource):
  def get(self, id):
    client = Client.query.filter(Client.id == id).first()
    if not client:
      return 'Client not found', 404
    
    client_dict = client.to_dict()

    return client_dict, 200
  
  def patch(self, id):
    client = Client.query.filter(Client.id == id).first()
    if not client:
      return 'Client not found', 404
    
    try:
      data = request.get_json()
      
      for attr in data:
        if attr != 'sessions':
          setattr(client, attr, data[attr])
        
      db.session.add(client)
      db.session.commit()
      return client.to_dict(), 202
    
    except:
      return 'Failed to update client', 400
    
  def delete(self, id):
    client = Client.query.filter(Client.id == id).first()
    if not client:
      return 'Client not found', 404
    
    db.session.delete(client)
    db.session.commit()

    return('Client successfully deleted', 204)
  
api.add_resource(ClientsById, '/api/clients/<int:id>')

class WorkoutPrograms(Resource):
  def get(self):
    workout_programs = WorkoutProgram.query.all()
    workout_programs_dict = [workout_program.to_dict() for workout_program in workout_programs]

    return workout_programs_dict, 200

  def post(self):
    data = request.get_json()

    new_workout_program = WorkoutProgram(
      name = data['name'],
      focus_area = data['focus_area']
    )

    try:
      db.session.add(new_workout_program)
      db.session.commit()
      return new_workout_program.to_dict(), 201
    except:
      return 'Failed to create new workout program', 400
    
api.add_resource(WorkoutPrograms, '/api/workoutprograms')

class Sessions(Resource):
  def get(self):
    sessions = Session.query.all()
    sessions_dict = [session.to_dict() for session in sessions]

    return sessions_dict, 200
  
  def post(self):
    data = request.get_json()

    new_session = Session(
      notes = data['notes'],
      client_id = data['client_id'],
      workout_program_id = data['workout_program_id'],
      
      # client = data['client'],
      # workout_program = data['workout_program']
    )

    try:
      db.session.add(new_session)
      db.session.commit()
      return new_session.to_dict(), 201
    except:
      return 'Failed to create new session', 400

api.add_resource(Sessions, '/api/sessions')


if __name__ == "__main__":
  app.run(port=5555, debug=True)
