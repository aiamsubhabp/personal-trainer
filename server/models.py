from sqlalchemy_serializer import SerializerMixin
from config import db, metadata, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property

client_workout_programs = db.Table(
    'client_workout_programs',
    metadata,
    db.Column('client_id', db.Integer, db.ForeignKey('clients.id'), primary_key = True),
    db.Column('workout_program_id', db.Integer, db.ForeignKey('workout_programs.id'), primary_key = True)
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    # serialize rules
    serialize_rules = ('-sessions.user', '-_password_hash')

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String, unique = True, nullable = False)
    _password_hash = db.Column(db.String)

    # set up one to many relationship wth Sessions
    sessions = db.relationship('Session', back_populates = 'user')

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f'User: {self.username}, ID: {self.id}'


class Client(db.Model, SerializerMixin):
    __tablename__ = 'clients'
    # will need to update serialize
    serialize_rules = ('-sessions.client', '-workout_programs')
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    weight = db.Column(db.Integer)
    goals = db.Column(db.String)
    image = db.Column(db.String)

    sessions = db.relationship('Session', back_populates = 'client')
    # add db relationship for workouts... secondary
    workout_programs = db.relationship('WorkoutProgram', secondary = client_workout_programs, back_populates = 'clients')

class WorkoutProgram(db.Model, SerializerMixin):
    __tablename__ = 'workout_programs'

    serialize_rules = ('-sessions.workout_program', '-clients')
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String)
    focus_area = db.Column(db.String)

    sessions = db.relationship('Session', back_populates = 'workout_program')
    # add db relationship for clients... secondary
    clients = db.relationship('Client', secondary = client_workout_programs, back_populates = 'workout_programs')

class Session(db.Model, SerializerMixin):
    __tablename__ = 'sessions'

    serialize_rules = ('-client.sessions', '-workout_program.sessions')
    
    id = db.Column(db.Integer, primary_key = True)
    notes = db.Column(db.String)

    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    workout_program_id = db.Column(db.Integer, db.ForeignKey('workout_programs.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    client = db.relationship('Client', back_populates = 'sessions')
    workout_program = db.relationship('WorkoutProgram', back_populates = 'sessions')

    # User relationship
    user = db.relationship('User', back_populates = 'sessions')


