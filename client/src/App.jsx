import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import ClientCard from './components/ClientCard'
import Header from './components/Header'

function App() {
  const [clients, setClients] = useState([])

  // const handleDelete(deletedClient){
  //   fetch('')
  // }

  useEffect(() => {
    fetch('/api/clients')
    .then((r => r.json()))
    .then(data => setClients(data))
  }, [])

  const clientCard = clients.map(client => (
    <ClientCard 
      key = {client.id}
      name = {client.name}
      age = {client.age}
      weight = {client.weight}
      goals = {client.goals}
    />
  ))

  return (
    <div className='app'>
      <Header />
      <NavBar />
      {clientCard}
    </div>
 
  )
}

export default App
