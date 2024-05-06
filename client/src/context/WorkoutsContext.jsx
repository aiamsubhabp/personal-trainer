import { createContext, useState, useEffect } from "react";

const WorkoutsContext = createContext([])

const WorkoutsProvider = ({children}) => {
    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
        fetch('/api/workoutprograms')
          .then((r => r.json()))
          .then(data =>setWorkouts(data))
      }, [])

    return <WorkoutsContext.Provider value={{workouts, setWorkouts}}>{children}</WorkoutsContext.Provider>
}

export {WorkoutsContext, WorkoutsProvider}

