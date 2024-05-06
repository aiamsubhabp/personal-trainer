import { createContext, useState, useEffect } from "react";

const ClientsContext = createContext([])

const ClientsProvider = ({children}) => {
    const [clients, setClients] = useState([])

    useEffect(() => {
        fetch('/api/clients')
            .then((r => r.json()))
            .then(data => {setClients(data)})
    }, [])

    function onDeleteItem(deletedId){
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
      
    
    return <ClientsContext.Provider value={{clients, setClients, onDeleteItem}} > {children} </ClientsContext.Provider>
}

export {ClientsContext, ClientsProvider}