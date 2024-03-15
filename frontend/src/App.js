import axios from 'axios'; // Import axios for making HTTP requests
import React, { Component } from 'react'; // Import React and Component from 'react' module
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Navbar from "./components/";
import About from "./pages/about/about";
import Contact from "./pages/contact/contact";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import PrivateRoutes from './utils/PrivateRoutes'
import { AuthProvider } from './context/AuthContext'

class App extends Component {  // Define a new class component named App
  
  state = {  // Initialize component state
    details: [],  // Initialize 'details' state as an empty array
    error: null  // Initialize 'error' state as null
  };

  componentDidMount() {  // Lifecycle method called after the component is mounted
    axios.get('http://localhost:8000/')  // Make an HTTP GET request to the specified URL
      .then(response => {  // Handle successful response
        this.setState({ details: response.data });  // Update 'details' state with data from the response
      })
      .catch(error => {  // Handle error
        this.setState({ error: error.message });  // Update 'error' state with error message
      });
  }

  render() {  // Render method to render component UI
    return (  // JSX markup for component UI
      <Router>
          <Navbar />
          <AuthProvider>
            <Routes>
            
              
              <Route element={<PrivateRoutes />}>
                <Route element={<Home />} path="/" exact/>
                <Route element={<Contact />} path="/contact"/>
              </Route>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </AuthProvider>

      </Router>
    );
  }
}

export default App;  // Export App component as default export



// Filename - App.js
/*
<div>
        <header>Data Generated from Django</header>
        <hr />
        {error ? (  // Conditionally render error message if 'error' state is not null
          <div>Error: {error}</div>
        ) : (  // Render list of details if no error
          <ul>
            {details.map((item, index) => (  // Map through 'details' array and render each item
              <li key={index}>
                <strong>Employee:</strong> {item.employee}, <strong>Department:</strong> {item.department}
              </li>
            ))}
          </ul>
        )}
      </div>
*/