import { useContext, useEffect, useState } from "react";
import {useFormik} from "formik"
import * as yup from "yup"
import { ClientsContext } from "../context/ClientsContext";
import { WorkoutsContext } from "../context/WorkoutsContext";


function SessionForm(){
    const {clients, setClients} = useContext(ClientsContext)
    const {workouts, setWorkouts} = useContext(WorkoutsContext)
    const [sessions, setSessions] = useState([{}])
    const [submissionStatus, setSubmissionStatus] = useState(null)

    const formSchema = yup.object().shape({
        notes: yup.string().required('Please enter session notes').max(250),
        // date: yup.date().required(),
        client_id: yup.number().required('please select the client'),
        workout_program_id: yup.number().required('please select the workout program')
    })

    const formik = useFormik({
        initialValues: {
            notes: '',
            client_id: null,
            workout_program_id: null
        },
        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {
            fetch('/api/sessions', {
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
                            setSessions(res)
                            resetForm()
                        })
                    } else {
                        console.error("Failed to add session.")
                    }
                })
        }
    })

    const clientOptions = clients.map(client => (
        <option key={client.id} value={client.id}>{client.name}</option>

    ))

    const workoutOptions = workouts.map(workout => (
        <option key={workout.id} value={workout.id}>{workout.name}</option>
    ))


    return(
        <div className="app">
            <header>
                <h2>Add a New Session</h2>
            </header>
            
            
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
                <label htmlFor="notes">Notes:</label>
                <textarea 
                    id = 'notes'
                    name = 'notes'
                    onChange={formik.handleChange}
                    value={formik.values.notes}
                    rows="4"
                    cols="50"
                />
                <p style = {{color:'red'}}> {formik.errors.notes}</p>
                <br/>

                <label>Select Client</label>
                <select
                    name="client_id"
                    value={formik.values.client_id}
                    onChange={formik.handleChange} 
                >   <option value={null}>Select Client</option>
                    {clientOptions}
                </select>
                <p style = {{color:'red'}}> {formik.errors.client_id}</p>
                <br/>

                <label>Select Workout</label>
                <select
                    name="workout_program_id"
                    value={formik.values.workout_program_id}
                    onChange={formik.handleChange} 
                >
                    <option value={null}>Select Workout</option>
                    {workoutOptions}
                </select>
                <p style = {{color:'red'}}> {formik.errors.workout_program_id}</p>
                <button type = 'submit'>Submit</button>
            </form>
            {submissionStatus === "success" && <p>New program successfully added</p>} 
            
        </div>
    )
}


export default SessionForm

                {/* <label htmlFor="date">Date:</label>
                <input 
                    id = 'date'
                    name = 'date'
                    onChange={formik.handleChange}
                    value={formik.values.date}            
                />
                <p style = {{color:'red'}}> {formik.errors.date}</p> */}