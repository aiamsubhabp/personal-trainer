import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import ClientCard from './components/ClientCard'
import Header from './components/Header'

function App() {
  const [clients, setClients] = useState([])

  function handleDelete(deletedId){
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
  }, [])

  const clientCard = clients.map(client => (
    <ClientCard 
      id = {client.id}
      key = {client.id}
      name = {client.name}
      age = {client.age}
      weight = {client.weight}
      goals = {client.goals}
      image = {client.image}
      onDeleteItem = {handleDelete}
    />
  ))

  return (
    <div className='app'>
      <Header />
      <NavBar />
      <ul className='cards'>
        {clientCard}
      </ul>
      
    </div>
 
  )
}

export default App
