from config import app, db, api
from flask import Flask, make_response, session, request, jsonify
from flask_migrate import Migrate
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app
from datetime import datetime

from models import Client, WorkoutProgram, Session, Appointment

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

class Appointments(Resource):
  def get(self):
    appointments = Appointment.query.all()
    appointments_dict = [appointment.to_dict() for appointment in appointments]

    return appointments_dict, 200
  
  # def post(self):
  #   data = request.get_json()
  #   # appointment = Appointment(
  #   #   client_name = data['client_name'],
  #   #   appointment_time = data['appointment_time']
  #   # )

  #   try:
  #     appointment_time = datetime.strptime(data['appointment_time'], '%Y-%m-%dT%H:%M:%S')
  #     appointment = Appointment(
  #       client_name = data['client_name'],
  #       appointment_time = appointment_time
  #     )
  #     db.session.add(appointment)
  #     db.session.commit()
  #     return appointment.to_dict(), 201
  #   except:
  #     return 'Failed to create appointment', 400
    
  def post(self):
    data = request.get_json()
    
    try:
      appointment_time = datetime.strptime(data['appointment_time'], '%Y-%m-%d %H:%M')
      appointment = Appointment(
        client_name = data['client_name'],
        appointment_time = appointment_time
      )
      db.session.add(appointment)
      db.session.commit()
      return appointment.to_dict(), 201
    except KeyError as e:
      return f'Missing key in data: {e}', 400
    except ValueError as e:
      return f'Invalid value for appointment_time: {e}', 400
    except Exception as e:
      return f'Failed to create appointment: {e}', 400
api.add_resource(Appointments, '/api/appointments')


if __name__ == "__main__":
  app.run(port=5555, debug=True)
