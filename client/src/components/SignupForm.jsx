import React, { useState, useContext } from "react";
import { userContext } from "../App";
import { useFormik } from "formik";
import * as yup from 'yup'
import { useNavigate } from "react-router-dom";

function SignupForm(){
    const {user, setUser} = useContext(userContext)
    // const navigate = useNavigate()
    // const [username, setUsername] = useState('')
    // const [password, setPassword] = useState('')

    const formSchema = yup.object().shape({
        username: yup
            .string()
            .required('Username is required')
            .min(5, 'Username must be at least 5 characters long')
            .max(15, 'Username must not exceed 15 characters'),
        password: yup  
            .string()
            .required('Please enter a password')
            .min(5, 'Password must be at least 5 characters long')
    })


    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/api/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then (r => {
                    console.log('Response: ', r)
                    if (r.ok) {
                        r.json().then(user => {
                            console.log('User: ', user)
                            setUser(user)
                            navigate('/')
                        }) 
                    } else{
                        console.error('Failure to add sign up')
                    }
                })
        }
    })

    return (
        <div className="app">
            <header>
                <h2>Sign Up</h2>
            </header>

            <form onSubmit={formik.handleSubmit} >
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    id="username"
                    autoComplete="off"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                />
                <p style={{color:'red'}}>{formik.errors.username}</p>

                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                <p style={{color:'red'}}>{formik.errors.password}</p>
                <button type="submit">Submit</button>

            </form>
        </div>
    )


}

export default SignupForm