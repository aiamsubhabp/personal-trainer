import { NavLink } from "react-router-dom";
import React from "react";
import './NavBar.css'

function NavBar(){
    return (
        <nav>
            <NavLink
                to = '/'
                className = 'nav-link'
            > Clients Page
            </NavLink>
            <NavLink
                to = '/clientform'
                className = 'nav-link'
            > Add a New Client
            </NavLink>
            <NavLink
                to = '/workoutform'
                className = 'nav-link'
            > Add a New Program
            </NavLink>
        </nav>
    )
}

export default NavBar