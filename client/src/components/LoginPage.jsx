import React, { useState } from "react";
import { useContext } from "react";
import { userContext } from "../App";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function LoginPage(){
    const {user, setUser} = useContext(userContext)
    const [showLogin, setShowLogin] = useState(true)
    
    return (
        <div>
            {showLogin ? (
                <>
                    <LoginForm /> 
                    <p>
                        Don't have an account? &nbsp;
                        <button onClick={() => setShowLogin(false)}>Sign Up</button>
                    </p>
                </>
            ) : (
                <>
                    <SignupForm />
                    <p>
                        Already have an account? &nbsp;
                        <button onClick={() => setShowLogin(true)}>Log In</button>
                    </p>
                </>                
            )}

        </div>
    )

}

export default LoginPage