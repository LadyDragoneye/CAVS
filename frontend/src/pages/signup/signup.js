
// Filename - pages/signup.js

import React, {useContext} from 'react'
import AuthContext from '../../context/AuthContext'


const SignUp = () => {
    let {signupUser} = useContext(AuthContext)
    return (
        <div>
            <form onSubmit={signupUser}>
                <input type="text" name="email" placeholder="Enter Email" />
                <input type="text" name="username" placeholder="Username" />

                <input type="password" name="password" placeholder="Password" />
                <input type="password" name="password2" placeholder="Password2" />

                <input type="submit"/>
            </form>
        </div>
    )
}

export default SignUp