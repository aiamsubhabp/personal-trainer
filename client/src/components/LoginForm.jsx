import React, { useState } from "react";

function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)



    return (
        <div>
            <h1>Log in Form</h1>
        </div>
    )
}

export default LoginForm