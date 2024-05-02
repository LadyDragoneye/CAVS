import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import AuthContext from "../context/AuthContext";
import { Navigate, useLocation } from 'react-router-dom';


const LogoutButton = () => {
  //let {logoutUser} = useContext(AuthContext)
  let location = useLocation();

  const Logout = () => {
    // Call logoutUser to logout the user
    //logoutUser(); 
    // Redirect to the home page
    return <Navigate to="/" state={{ from: location }} replace />;
    };

  // Button for the navbar
  return (
      <Button variant="primary" onClick={Logout}>
        Logout
      </Button>
  );
};

export default LogoutButton;