import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ClientCard({name, age, weight, goals}){

    return(
        <li className="card">
            <h4>Name: {name}</h4>
            <h5>Age: {age}</h5>
            <h5>Weight: {weight}</h5>
            <h5>Goals: {goals}</h5>
            <button>Edit</button>
            <button>Delete</button>

        </li>
    )
}


export default ClientCard