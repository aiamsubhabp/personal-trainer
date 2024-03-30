from sqlalchemy_serializer import SerializerMixin
from config import db

class Client(db.Model, SerializerMixin):
    __tablename__ = 'clients'

    serialize_rules = ('-sessions.client',)
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    goals = db.Column(db.String)

    sessions = db.relationship('Session', back_populates = 'client')

class WorkoutProgram(db.Model, SerializerMixin):
    __tablename__ = 'workout_programs'

    serialize_rules = ('-sessions.workout_program',)
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    focus_area = db.Column(db.String)
    difficulty = db.Column(db.String)

    sessions = db.relationship('Session', back_populates = 'workout_program')

class Session(db.Model, SerializerMixin):
    __tablename__ = 'sessions'

    serialize_rules = ('-client.sessions', '-workout_program.sessions')
    
    id = db.Column(db.Integer, primary_key = True)
    notes = db.Column(db.String)

    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    workout_program_id = db.Column(db.Integer, db.ForeignKey('workout_programs.id'))

    client = db.relationship('Client', back_populates = 'sessions')
    workout_program = db.relationship('WorkoutProgram', back_populates = 'sessions')


