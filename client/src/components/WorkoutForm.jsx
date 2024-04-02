import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useFormik} from "formik"
import * as yup from "yup"
import NavBar from "./NavBar";
import Header from "./Header";

// name, age, weight, goals

function WorkoutForm(){

    return(
        <div className="app">
            <Header />
            <NavBar />
            <br />
            <h1>Add a New Client</h1>
            
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
                <label htmlFor="name">Name:</label>
                <input 
                    id = 'name'
                    name = 'name'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <p style = {{color:'red'}}> {formik.errors.name}</p>
                <br />
                <label htmlFor="age">Age:</label>
                <input 
                    id = 'age'
                    name = 'age'
                    onChange={formik.handleChange}
                    value={formik.values.age}
                />
                <p style = {{color:'red'}}> {formik.errors.age}</p>
                <br />
                <label htmlFor="weight">Weight (in lbs):</label>
                <input 
                    id = 'weight'
                    name = 'weight'
                    onChange={formik.handleChange}
                    value={formik.values.weight}
                />
                <p style = {{color:'red'}}> {formik.errors.weight}</p>
                <br />
                <label htmlFor="image">Image URL:</label>
                <input 
                    id = 'image'
                    name = 'image'
                    onChange={formik.handleChange}
                    value={formik.values.image}
                />
                <p style = {{color:'red'}}> {formik.errors.image}</p>
                <br />
                <label htmlFor="goals">Goals:</label>
                <textarea 
                    id = 'goals'
                    name = 'goals'
                    onChange={formik.handleChange}
                    value={formik.values.goals}
                    rows="8"
                    cols="60"
              
                >Enter text here...
                </textarea>
                <p style = {{color:'red'}}> {formik.errors.goals}</p>
                <button type = 'submit'>Submit</button>
            </form>
            {submissionStatus === "success" && <p>Client successfully added</p>} 
            
        </div>
    )
}


export default WorkoutForm