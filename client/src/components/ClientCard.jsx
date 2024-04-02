import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ClientCard({client, id, name, age, weight, goals, image, onDeleteItem, setClients}){
    const [editMode, setEditMode] = useState(null)
    const [editClient, setEditClient] = useState({
        id: null,
        name: '',
        age: '',
        weight: '',
        goals: '',
        image: ''
      })

    function handleEdit(client){
        setEditClient(client)
        setEditMode(client.id)
    }
  // COME BACK TO THIS PATCH, FOR SOME REASON NOW GETTING status 400
    function handleSave(){
      fetch(`/api/clients/${editClient.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editClient)
      })
        .then(r => {
          if (r.status === 202) {
            setClients(updatedClients => updatedClients.map(client => (client.id === editClient.id ? editClient : client)))
            setEditMode(null)
          } else {
            console.error("Failed to update client")
          }
        })
    }

    return(
        <>  {editMode === id ? 
            <>
                <input 
                    value={editClient.name}
                    onChange={e => 
                    setEditClient(prev => ({...prev, name: e.target.value}))}
                />
                <button onClick = {handleSave}>Save</button>
            </> : 
            <li className="card">
                
                <img src = {image} />
                <h4>Name: {name}</h4>
                <h5>Age: {age}</h5>
                <h5>Weight: {weight}</h5>
                <h5>Goals: {goals}</h5>
                <button onClick={() => handleEdit(client)}>Edit</button>
                <button onClick={() => onDeleteItem(id)}>Delete</button>
            </li>
          }
        </>
    )
}


export default ClientCard


            // setEditClient({
            //     id: null,
            //     name: '',
            //     // age: '',
            //     // weight: '',
            //     // goals: '', 
            //     // image: ''
            // })