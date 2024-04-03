import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import Header from './components/Header'
import ClientForm from './components/ClientForm'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WorkoutForm from './components/WorkoutForm'
import SessionForm from './components/SessionForm'
import ClientList from './components/ClientList'

function App() {

  const [clients, setClients] = useState([])

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
    .then(data => setClients(data))
  }, [clients])

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
        <Route path='/clientform' element = {<ClientForm />}/>
        <Route path='/workoutform' element = {<WorkoutForm />} />
        <Route path='/sessionform' element = { <SessionForm />} />
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