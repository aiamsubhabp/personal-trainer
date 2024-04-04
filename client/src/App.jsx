import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import Header from './components/Header'
import ClientForm from './components/ClientForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WorkoutForm from './components/WorkoutForm'
import SessionForm from './components/SessionForm'
import ClientList from './components/ClientList'
import ClientSession from './components/ClientSessions'

function App() {

  const [clients, setClients] = useState([])
  const [workouts, setWorkouts] = useState([])

  function handleDelete(deletedId){
    console.log(deletedId)
    fetch(`/api/clients/${deletedId}`, {
      method: 'DELETE',
    })
      .then(r => {
        if (r.status == 204) {
          setClients(udpatedClients => udpatedClients.filter(client => client.id !== deletedId))
        } else {
          console.error("Failed to delete client")
        }
      })

  }

  useEffect(() => {
    fetch('/api/clients')
    .then((r => r.json()))
    .then(data => {
      setClients(data)})
  }, [])

  useEffect(() => {
    fetch('/api/workoutprograms')
      .then((r => r.json()))
      .then(data =>setWorkouts(data))
  }, [])

  

  return (
    <Router>
      <Header />
      <NavBar />
      <Routes>
        <Route path='/' element = {<ClientList 
          clients = {clients} 
          setClients = {setClients} 
          onDeleteItem = {handleDelete}/>}
        />
        <Route path='/clientform' element = {<ClientForm 
          clients = {clients}
          setClients = {setClients}
          />}
        />
        <Route path='/workoutform' element = {<WorkoutForm 
          workouts = {workouts}
          setWorkouts = {setWorkouts}
          />} 
        />
        <Route path='/sessionform' element = { <SessionForm 
          clients = {clients}
          setClients = {setClients}
          workouts = {workouts}
          setWorkouts = {setWorkouts}
          />} 
        />
        <Route path='/clients/:id' element = {<ClientSession clients = {clients}/>} />
      </Routes>
    </Router>
  )
}

export default App

// return (
//   <div className='app'>
//     <Header />
//     <NavBar />
//     <ul className='cards'>
//       {clientCard}
//     </ul>
    
//   </div>

// )
// }