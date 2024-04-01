from config import app, db, api
from flask import Flask, make_response, session, request, jsonify
from flask_migrate import Migrate
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app

from models import Client, WorkoutProgram, Session

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
      goals = data['goals']
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






if __name__ == "__main__":
  app.run(port=5555, debug=True)
