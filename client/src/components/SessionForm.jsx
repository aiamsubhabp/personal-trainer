import { useEffect, useState } from "react";
import {useFormik} from "formik"
import * as yup from "yup"
import NavBar from "./NavBar";
import Header from "./Header";


function SessionForm(){
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
            date: '',
            client_id: '',
            workout_program_id: ''
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

    return(
        <div className="app">
            <br />
            <h1>Add a New Session</h1>
            
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
                <br/>
                <select
                    name="client_id"
                    value={formik.values.client_id}
                    onChange={formik.handleChange} 
                />
                <option value="Option 1">select</option>
                <p style = {{color:'red'}}> {formik.errors.notes}</p>
                <br />

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