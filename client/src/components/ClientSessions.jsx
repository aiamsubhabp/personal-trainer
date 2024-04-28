import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ClientSession({clients}){
  const [clientSessions, setClientSessions] = useState([])
  const params = useParams()
  const clientId = params.id

  const clientObj = clients.find(client => client.id == clientId)
  console.log(clientObj)

  useEffect(() => {
      fetch(`/api/clients/${clientId}`)
          .then(r => r.json())
          .then(data => {
              setClientSessions(data.sessions)
              // console.log(data.sessions[0].notes)
          })
  }, [])

  const renderSessions = clientSessions.map((session, index) => (
      <div key={index} className="session-card">
        <h4>Workout Program:</h4>
        <h5>{session.workout_program.name}</h5>
        <h4>Notes:</h4>
        <h5>{session.notes}</h5>
      </div>
  ));
  
  return (
      <div className="app">
        <header>
        {clientObj && <h2>{clientObj.name}'s Session Notes</h2>}
        </header>
        <main className="sessions-container">{renderSessions}</main>
      </div>
    );
  }

export default ClientSession