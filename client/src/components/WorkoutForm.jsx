import { useContext, useEffect, useState } from "react";
import {useFormik} from "formik"
import * as yup from "yup"
import { WorkoutsContext } from "../context/WorkoutsContext";



function WorkoutForm(){
    const {workouts, setWorkouts} = useContext(WorkoutsContext)
    const [submissionStatus, setSubmissionStatus] = useState(null)

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name").max(50),
        focus_area: yup
            .string()
            .required('Must enter program focus area')
            .max(200),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            focus_area: '',
        },
        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {
            fetch('/api/workoutprograms', {
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
                            setWorkouts([...workouts, res])
                            resetForm()
                            setTimeout(() => {
                                setSubmissionStatus(null)
                            }, 3000);
                        })
                    } else {
                        console.error("Failed to add program.")
                    }
                })
        }
    })

    return(
        <div className="app">
            <header>
                <h2>Add a New Workout Program</h2>
            </header>
        
            
            <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
                <label htmlFor="name">Program Name:</label>
                <input 
                    id = 'name'
                    name = 'name'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
                <p style = {{color:'red'}}> {formik.errors.name}</p>
                <br />
                <label htmlFor="focus_area">Focus Area:</label>
                <textarea 
                    id = 'focus_area'
                    name = 'focus_area'
                    onChange={formik.handleChange}
                    value={formik.values.focus_area}
                    rows="4"
                    cols="60"
              
                >Enter text here...
                </textarea>
                <p style = {{color:'red'}}> {formik.errors.focus_area}</p>
                <button type = 'submit'>Submit</button>
            </form>
            {submissionStatus === "success" && <p>New program successfully added</p>} 
            
        </div>
    )
}


export default WorkoutForm