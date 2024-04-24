import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {useFormik} from "formik"
import * as yup from "yup"
import { clientsContext } from "../App";


function ClientForm(){

    const {clients, setClients} = useContext(clientsContext)
    
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
            .max(300),
        image: yup.string()
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            weight: '',
            goals: '',
            image: ''

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
                            setClients([...clients, res])
                            console.log('Updated clients:', res)
                            resetForm()
                            setTimeout(() => {
                                setSubmissionStatus(null)
                            }, 3000);
                        })
                    } else {
                        console.error("Failed to add client.")
                    }
                })
        }
    })



    return(
        <div className="app">
            <header>
                <h2>Add a New Client</h2>
            </header>
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


export default ClientForm