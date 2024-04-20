import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import logo from './CAVSlogo.png';

<link href="styles.css" rel="stylesheet"></link>


const Login = () => {

    let {loginUser} = useContext(AuthContext)
    
    //create your forceUpdate hook
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
   
    console.log("rendering...");

    return (

        <html lang="en">
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="description" content="noindex"/>
            <meta name="author" content=""/>
            <link rel="icon" href="/docs/4.0/assets/img/favicons/favicon.ico"/>

            <title>Signin</title>

            <link rel="canonical" href="https://getbootstrap.com/docs/4.0/examples/sign-in/"/>

            <link href="../../dist/css/bootstrap.min.css" rel="stylesheet"/>

            <link href="signin.css" rel="stylesheet"/>
        </head>

        <body class="text-center">
        <img src={logo} alt="CAVS logo" height={125} width={125}></img>
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

        <div>
            <form onSubmit={loginUser}>
                <input type="text" name="email" placeholder="Enter Email" />
                <input type="password" name="password" placeholder="Enter Password" />
                
                <div class="container p-4">

                <button onClick = {forceUpdate} class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

                    <p class="col md-3">or</p>
                    <a class ="p-4" href="/sign-up" role = "button">Register here</a>
                        </div>
            </form>
        </div>

        </body>

        </html>
    
    )
}

export default Login