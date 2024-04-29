import React, { useState } from "react";
import { useContext } from "react";

function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const {user, setUser} = useContext(userContext) 

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        }).then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user))
            } else {
                console.log('ERROR')
            }
        })

    }



    return (
        <div>
            <h1>Log in Form</h1>
        </div>
    )
}

export default LoginForm