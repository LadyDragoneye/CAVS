import React, { Component } from 'react'; // Import React and Component from 'react' module
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Navbar from "./components/";
import { AuthProvider } from './context/AuthContext';
import FAQ from "./pages/FAQ/FAQ";
import Account from "./pages/account/account";
import Cal from "./pages/calendar/Cal";
import Contact from "./pages/contact/contact";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import PrivateRoutes from './utils/PrivateRoutes';
import PrivateRoutesAuthenticated from './utils/PrivateRoutesAuthenticated';
import Notes from './pages/notes/notes'



class App extends Component {  // Define a new class component named App
  
  state = {  // Initialize component state
    details: [],  // Initialize 'details' state as an empty array
    error: null  // Initialize 'error' state as null
  };

  render() {  // Render method to render component UI
    // Check if user is authenticated

    return (  // JSX markup for component UI
    <Router>
      <AuthProvider>
      <Navbar />
        <Routes>

          <Route element={<PrivateRoutesAuthenticated/>}>
            <Route path={"/login"} element={<Login />}/>
            <Route path={"/sign-up"} element={<SignUp />}/>
          </Route>
          <Route exact path="/" element={<Home />} />
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route element={<PrivateRoutes/>}>
            <Route path="/account" element={<Account />}/>
            <Route path="/cal" element={<Cal />}/>
          </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );

}
}

export default App;  // Export App component as default export