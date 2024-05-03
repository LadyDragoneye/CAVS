// Filename - pages/signup.js

import React, {useContext} from 'react'
import AuthContext from '../../context/AuthContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./signup.css";
import logo from '../login/CAVSlogo.png';
<link href="signup.css" rel="stylesheet"></link>


const SignUp = () => {
    let {signupUser} = useContext(AuthContext)
    return (

        <html lang="en">
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="description" content=""/>
            <meta name="author" content=""/>
            <title>Signin</title>

            <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/sign-in/"/>

            <link href="../../dist/css/bootstrap.min.css" rel="stylesheet"/>

            <link href="signin.css" rel="stylesheet"/>
        </head>



        <body class="text-center">
        <div class="container pt-5 mt-5">
        <img src={logo} alt="CAVS logo" height={125} width={125}></img>
        <h1 id="title">Please register</h1>
        <div class="row m-4">
                        <div class="col-sm">
                            <input type="firstname" id="inputFname" class="form-control" placeholder="First Name" required autofocus/> 
                        </div>
                        <div class="col-sm">
                            <input type="lastname" id="inputLname" class="form-control" placeholder="Last Name" required autofocus/>
                        </div>
                    </div>

            <div class="row m-4">
            <form onSubmit={signupUser}>
                <div class="col-sm" id="emUs">
                <input type="text" name="email" placeholder="Enter Email" class="inBox1"/>
                <input type="text" name="username" placeholder="Username" class="inBox2"/>
                </div>
                <div class="col-sm" id="pass">
                <input type="password" name="password" placeholder="Password" class="inBox"/>
                <input type="password" name="password2" placeholder="Password Again" class="inBox"/>
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit" id="regButton">Register</button>
            </form>
                </div>
                        </div>

        </body>

        </html>

    )
}

export default SignUp