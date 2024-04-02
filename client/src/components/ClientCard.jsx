import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ClientCard({id, name, age, weight, goals, image, onDeleteItem}){


    return(
        <li className="card">
            <img src = {image} />
            <h4>Name: {name}</h4>
            <h5>Age: {age}</h5>
            <h5>Weight: {weight}</h5>
            <h5>Goals: {goals}</h5>
            <button>Edit</button>
            <button onClick={() => onDeleteItem(id)}>Delete</button>

        </li>
    )
}


export default ClientCard