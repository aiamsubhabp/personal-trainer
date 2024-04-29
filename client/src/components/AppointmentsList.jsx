import React from 'react';

const AppointmentsList = ({ appointments }) => {
  // Separate previous and upcoming appointments
  const now = new Date();
  const previousAppointments = appointments.filter(appointment => new Date(appointment.appointment_time) < now);
  const upcomingAppointments = appointments.filter(appointment => new Date(appointment.appointment_time) >= now);

  // Sort previous appointments from earliest to latest
  previousAppointments.sort((a, b) => new Date(a.appointment_time) - new Date(b.appointment_time));

  // Group upcoming appointments by date
  const groupedUpcomingAppointments = {};
  upcomingAppointments.forEach(appointment => {
    const date = new Date(appointment.appointment_time).toLocaleDateString();
    if (!groupedUpcomingAppointments[date]) {
      groupedUpcomingAppointments[date] = [];
    }
    groupedUpcomingAppointments[date].push(appointment);
  });

  // Sort dates in ascending order
  const sortedDates = Object.keys(groupedUpcomingAppointments).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  });

  return (
    <div>
      <br />
      <h2>Previous Appointments</h2>
      <ul>
        {previousAppointments.map(appointment => (
          <li key={appointment.id} style={{color:'red'}}>
            <strong>{appointment.client_name}</strong> @ {new Date(appointment.appointment_time).toLocaleString()}
          </li>
        ))}
      </ul>
      <br />
      <h2>Upcoming Appointments</h2>
      {sortedDates.map(date => (
        <div key={date}>
          <h3>{date}</h3>
          <ul>
            {groupedUpcomingAppointments[date].map(appointment => (
              <li key={appointment.id}>
                <strong>{appointment.client_name}</strong> @ {new Date(appointment.appointment_time).toLocaleString()}
              </li>
            ))}
          </ul>
          <br />
        </div>
      ))}
    </div>
  );
};

export default AppointmentsList;
