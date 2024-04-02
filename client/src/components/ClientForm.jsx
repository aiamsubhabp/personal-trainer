import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useFormik} from "formik"
import * as yup from "yup"
import NavBar from "./NavBar";
import Header from "./Header";

// name, age, weight, goals

function ClientForm(){
    const [clients, setClients] = useState([{}])
    const [submissionStatus, setSubmissionStatus] = useState(null)

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name").max(20),
        age: yup
            .number()
            .positive()
            .integer()
            .required("Must enter age")
            .typeError('Please enter a positive integer')
            .max(120),
        weight: yup
            .number()
            .positive()
            .integer()
            .required('Must enter weight (lbs)')
            .typeError('Please enter a positive integer')
            .max(999),
        goals: yup
            .string()
            .required('Must enter client goal(s)')
            .max(300)
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            weight: '',
            goals: ''

        },
        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {
            fetch('/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(r => {
                    if (r.ok) {
                        setSubmissionStatus("success")
                        r.json().then(res => {
                            setClients(res)
                            resetForm()
                        })
                    } else {
                        console.error("Failed to add client.")
                    }
                })
        }
    })



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


export default ClientForm