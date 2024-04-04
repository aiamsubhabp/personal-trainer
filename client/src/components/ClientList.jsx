import ClientCard from "./ClientCard"

function ClientList({clients, setClients, onDeleteItem}){
    console.log(clients)
    const clientCard = clients.map(client => (
        <ClientCard 
          client = {client}
          id = {client.id}
          key = {client.id}
          name = {client.name}
          age = {client.age}
          weight = {client.weight}
          goals = {client.goals}
          image = {client.image}
          onDeleteItem = {onDeleteItem}
          setClients = {setClients}
        />
      ))
    
    return(
        <div className="app">
            <header>
                <h2>My Clients</h2>
            </header>
            <ul className="cards">
                {clientCard}
            </ul>
        </div>

    )
}

export default ClientList