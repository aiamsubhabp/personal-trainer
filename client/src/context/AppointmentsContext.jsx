import { createContext, useState, useEffect } from "react";

const AppointmentsContext = createContext([])

const AppointmentsProvider = ({children}) => {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        fetch('/api/appointments')
          .then(response => response.json())
          .then(data => setAppointments(data))
          .catch(error => console.error('Error fetching appointments:', error));
      }, []);

    return <AppointmentsContext.Provider value={{appointments, setAppointments}}>{children}</AppointmentsContext.Provider>
}

export {AppointmentsContext, AppointmentsProvider}


