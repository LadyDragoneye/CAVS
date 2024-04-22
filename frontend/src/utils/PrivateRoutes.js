import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const PrivateRoutes = () => {
    const { user } = useContext(AuthContext);
    let location = useLocation();

    // Check if user is authenticated
    const isAuthenticated = user !== null && user !== undefined; // Adjust this condition based on your authentication logic

    // If user is not authenticated, navigate to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace/>;
    }

    // If user is authenticated, render child routes
    return <Outlet />;
};

export default PrivateRoutes;
