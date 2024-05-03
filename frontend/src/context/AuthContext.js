import jwt_decode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext()

// 1:20:23

export default AuthContext;


export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=> localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)

    let history = useNavigate()

    let loginUser = async (e )=> {
        e.preventDefault()
        console.log('Form submitted')
        let response = await fetch('http://localhost:8000/app/token/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:e.target.email.value, password:e.target.password.value})
        })
        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            console.log('Access token:', data.access); // Logging the access token
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            history('/')
        }else{
            alert('Something went wrong!')
        }

    }

    // signupUser
    let signupUser = async (e) => {
        e.preventDefault();
        console.log('Sign-up form submitted');
    
        // Fetch API call to sign up the user
        let response = await fetch('http://localhost:8000/app/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:e.target.email.value,
                username:e.target.username.value,
                password:e.target.password.value,
                password2: e.target.password2.value, // Update field name here
            })
            
        });
        console.log('posted');

        let data = await response.json();
    
        if (response.status === 201) { // Assuming status code 201 for successful signup
            console.log('User signed up successfully:', data);
    
            // You may handle success cases like redirecting to login page or any other actions
            // For now, let's just log the response and display an alert
            alert('User signed up successfully!');
            history('/login');
        } else {
            console.error('Error signing up user:', data);
            alert('Something went wrong during sign-up!');
        }
    }



    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history('/login')

    }
    let updateToken = async ()=> {

        let response = await fetch('http://localhost:8000/app/token/refresh/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })

        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }
    }


    let contextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        signupUser:signupUser,
        logoutUser:logoutUser, // need to add logout button
    }

    useEffect(()=> {

        if(loading){
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4

        let interval =  setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes)
        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}