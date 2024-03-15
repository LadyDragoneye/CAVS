import { createContext, useState, useEffect } from "react";

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {


    let [authTokens, setAuthtokens] = useState(null)
    let [user, setUser] = useState(null)



    let loginUser = async (e )=> {
        e.preventDefault()
        console.log('Form submitted')
        let response = await fetch('http://localhost:8001/app/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:e.target.email.value, password:e.target.password.value})
        })
        let data = await response.json()
        console.log('data:', data)
    }

    let contextData = {
        loginUser:loginUser
    }
    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}