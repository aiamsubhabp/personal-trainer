import { useState, useEffect, createContext } from 'react'
import NavBar from './components/NavBar'
import Header from './components/Header'
import ClientForm from './components/ClientForm'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import WorkoutForm from './components/WorkoutForm'
import SessionForm from './components/SessionForm'
import ClientList from './components/ClientList'
import ClientSession from './components/ClientSessions'
import LoginPage from './components/LoginPage'
import SignupForm from './components/SignupForm'

export const clientsContext = createContext([])
export const workoutsContext = createContext([])
export const userContext = createContext(null)

function App() {

  const [clients, setClients] = useState([])
  const [workouts, setWorkouts] = useState([])
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  // useEffect(() => {
  //   fetch('/api/check_session').then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user))
  //     } else {
  //       navigate('/login')
  //     }
  //   })
  // }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/check_session')
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          navigate('/login')
        }
      } catch (error) {
        console.error('Error checking session:', error)
      }
    }

    fetchData()
  }, [navigate])

  // if (!user) return (

  //   <userContext.Provider value={{user, setUser}}>
  //     <Router>
  //       <Routes>
  //         <Route path='/signup' element = {<SignupForm/>} /> 
  //         <Route path='/login' element = {<LoginPage/>} />
  //         <Route path='/test' element = {<Test />} />
  //       </Routes>
  //     </Router>
  //   </userContext.Provider>  
  // )  

  // if (!user) return (

  //   <userContext.Provider value={{user, setUser}}>
  //     <LoginPage />
  //   </userContext.Provider>  
  // )  

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
    <>
      <Header />
      {/* might have to move NavBar to each page */}
      <NavBar />
      
      <clientsContext.Provider value={{clients, setClients}}>
      <workoutsContext.Provider value = {{workouts, setWorkouts}}>
      <userContext.Provider value={{user, setUser}}>
        <Routes>
          {user ? (
            <>
              
              <Route path='/' element = {<ClientList onDeleteItem = {handleDelete}/>}/>
              <Route path='/clientform' element = {<ClientForm/>}/>
              <Route path='/workoutform' element = {<WorkoutForm/>}/>
              <Route path='/sessionform' element = { <SessionForm/>}/>
              <Route path='/clients/:id' element = {<ClientSession clients = {clients} />} />
            </>
          ) : (
            <>
              
              <Route path='/login' element = {<LoginPage />} />
              <Route path='/signup' element = {<SignupForm />} />
            </>
          )}
        </Routes>
      </userContext.Provider>
      </workoutsContext.Provider>
      </clientsContext.Provider>
    </>
  )
}

export default App

// return (
//   <Router>
//     <Header />
//     <NavBar />
//     <clientsContext.Provider value={{clients, setClients}}>
//     <workoutsContext.Provider value = {{workouts, setWorkouts}}>
//       <Routes>
//         <Route path='/' element = {<ClientList 
//           // clients = {clients} 
//           // setClients = {setClients} 
//           onDeleteItem = {handleDelete}/>}
//         />
//         <Route path='/clientform' element = {<ClientForm 
//           // clients = {clients}
//           // setClients = {setClients}
//           />}
//         />
//         <Route path='/workoutform' element = {<WorkoutForm 
//           // workouts = {workouts}
//           // setWorkouts = {setWorkouts}
//           />} 
//         />
//         <Route path='/sessionform' element = { <SessionForm 
//           // clients = {clients}
//           // setClients = {setClients}
//           // workouts = {workouts}
//           // setWorkouts = {setWorkouts}
//           />} 
//         />
//         <Route path='/clients/:id' element = {<ClientSession clients = {clients} />} />

        
//       </Routes>
//       </workoutsContext.Provider>
//     </clientsContext.Provider>
//   </Router>
// )
// }