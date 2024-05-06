# Personal Trainer App
## App Description
 - This app is a handy tool for personal trainers to use to keep track of their clients' workouts as well as provide feedback. 
 - This app allows the user (the personal trainer) to add new clients, create new workout programs, and create sessions, associating the client with the workout program, and provide their own notes.
 - Additionally, the user is able to edit and delete clients as well.
 - There is also a feature for the user to schedule appointments using a calendar and time slot system. 

## Routes
- There are five routes located in the app.py file. 
- The Clients route contains methods for get and post requests.
- The ClientsById route contains methods for get, patch, and delete requests.
- The WorkoutPrograms route contains methods for get and post requests.
- The Sessions route contains methods for get and post requests.
- The Appointments route contains methods for get and post requests. 

## Models
- This project consists of four models, Client, WorkoutProgram, Appointment, and Session.
- There exists a one to many relationship between Client and Session, as well as between WorkoutProgram and Session.
- There exists a reciprocal many to many relationship between Client and WorkoutProgram.

## Roadmap
- Allow the user to customize the workout programs to include specific exercises.
- Allow full CRUD for the WorkoutPrograms and Sessions.