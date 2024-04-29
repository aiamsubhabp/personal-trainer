from config import app, db
from models import Client, WorkoutProgram, Session, client_workout_programs, Appointment
import datetime

if __name__ == "__main__":
  with app.app_context():
    print('Deleting all records...')
    Session.query.delete()
    Client.query.delete()
    WorkoutProgram.query.delete()
    Appointment.query.delete()
    db.session.query(client_workout_programs).delete()

    print('Seeding...')

    c1 = Client(name = 'Mario', age = 25, weight = 150, goals = 'I want to jump higher', image = 'https://media.istockphoto.com/id/1207856385/photo/joyful-happy-african-american-young-man-in-eyeglasses-portrait.jpg?s=612x612&w=0&k=20&c=M5sUFPE5xlF1fMxvNYgAqdpSZYKxSor3-SlF-o6IiJ0=' )
    c2 = Client(name = 'John', age = 56, weight = 150, goals = 'I want keep up with my grandkids', image ='https://thumbs.dreamstime.com/b/happy-old-man-29232681.jpg' )
    c3 = Client(name = 'Sasha', age = 24, weight = 130, goals = 'Be a better soccer player', image = 'https://as1.ftcdn.net/v2/jpg/02/58/89/62/1000_F_258896226_zVd0SsGv0ncRK7b6yZXmflz3Ekn2XT7M.jpg' )

    db.session.add_all([c1, c2, c3])
    db.session.commit()

    w1 = WorkoutProgram(name = 'Dynamic Strength Routine', focus_area = 'full body, strength and cardiovascular endurance')
    w2 = WorkoutProgram(name = 'Core Stability', focus_area = 'core, strength and stability')
    w3 = WorkoutProgram(name = 'Cardio Conditioning', focus_area = 'cardiovascular endurance and fat burning')
    w4 = WorkoutProgram(name = 'General Muscle Building Routine', focus_area = 'build lean muscle and burn fat with this resistance training routine')
    w5 = WorkoutProgram(name = 'Speed and Agility Training', focus_area = 'improve speed and agility incorporating drills/exercises used by athletes')
    w6 = WorkoutProgram(name = 'Explosive Power', focus_area = 'combines explosive movements and plyometrics')

    db.session.add_all([w1, w2, w3, w4, w5, w6])
    db.session.commit()

    c1_w5 = Session(notes = 'Mario excelled in agility drills, demonstrating quick reflexes and precise footwork. His agility and balance were remarkable, showcasing his readiness for fast-paced challenges.', client = c1, workout_program = w5)
    c1_w6 = Session(notes = "In the explosive power session, Mario displayed impressive strength and explosiveness. His jumps were powerful and controlled, showing significant improvement in sprinting speed. Mario's dedication and intensity were evident, impressing the trainers with his potential for explosive strength.", client = c1, workout_program = w6)

    c2_w4 = Session(notes = "John demonstrated consistent effort and commitment in the muscle-building routine. Despite initial challenges, he steadily improved his strength and form over time. ", client = c2, workout_program = w4)

    c3_c6 = Session(notes = "Sasha exhibited impressive speed and agility during the training sessions. Her quick reflexes and nimble footwork were evident as she maneuvered through agility drills with precision. Sasha's ability to change direction swiftly and maintain control over her movements showed her readiness to excel on the soccer field.", client = c3, workout_program = w6)

    db.session.add_all([c1_w5, c1_w6, c2_w4, c3_c6])
    db.session.commit()


    w1.clients.append(c1)

    db.session.commit()

    # Function to round up to the nearest half-hour
    def round_up_to_half_hour(dt):
        minutes = dt.minute
        if minutes <= 30:
            return dt.replace(minute=30, second=0, microsecond=0)
        else:
            return dt.replace(hour=dt.hour + 1, minute=0, second=0, microsecond=0)

    # Create appointments
    now = datetime.datetime.now()

    # Round up the current time to the nearest half-hour
    rounded_now = round_up_to_half_hour(now)

    # Create two appointments that have already passed
    past_appointment1 = Appointment(client_name=c1.name, appointment_time=rounded_now - datetime.timedelta(days=1, hours=2, minutes=30))
    past_appointment2 = Appointment(client_name=c2.name, appointment_time=rounded_now - datetime.timedelta(days=1, hours=1))

    # Create two appointments for the future in 30-minute increments
    future_appointment1 = Appointment(client_name=c3.name, appointment_time=rounded_now + datetime.timedelta(days=1, hours=12))
    future_appointment2 = Appointment(client_name=c1.name, appointment_time=rounded_now + datetime.timedelta(days=2, hours=9))

    db.session.add_all([past_appointment1, past_appointment2, future_appointment1, future_appointment2])
    db.session.commit()












