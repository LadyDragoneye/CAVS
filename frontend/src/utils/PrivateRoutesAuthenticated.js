import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoutesAuthenticated = () => {
    const { user } = useContext(AuthContext);

    // Check if user is authenticated
    const isAuthenticated = user !== null && user !== undefined; // Adjust this condition based on your authentication logic

    // If user is authenticated, navigate to account page
    if (isAuthenticated) {
        return <Navigate to="/account"/>;
    }
    else{
        return <Outlet />;
    }

    // If user is not authenticated, render child routes

};

export default PrivateRoutesAuthenticated;
