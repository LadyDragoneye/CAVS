// Filename - "./components/Navbar.js
 
import React from "react";
import AuthContext from "../context/AuthContext";
import logo from './CAVSlogo.png';
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
    const { user } = AuthContext

    // Check if user is authenticated
    const isAuthenticated = user !== null && user !== undefined; // Adjust this condition based on your authentication logic
    if (isAuthenticated) {
        return (
            <>
                <Nav>
                {<img src={logo} alt="CAVS logo" height={125} width={125}></img>}
                    <NavMenu>
                        <NavLink to="/" activeStyle>
                            Home
                        </NavLink>
                        <NavLink to="/FAQ" activeStyle>
                            FAQ
                        </NavLink>
                        <NavLink to="/contact" activeStyle>
                            Contact Us
                        </NavLink>
                        <NavLink to="/account" activeStyle>
                            Account
                        </NavLink>
                        <NavLink to="/Cal" activeStyle>
                            Calendar
                        </NavLink>
                    </NavMenu>
                </Nav>
            </>
        );
    }
    else {
        return(
        <>
        <Nav>
                {<img src={logo} alt="CAVS logo" height={125} width={125}></img>}
                    <NavMenu>
                        <NavLink to="/" activeStyle>
                            Home
                        </NavLink>
                        <NavLink to="/FAQ" activeStyle>
                            FAQ
                        </NavLink>
                        <NavLink to="/contact" activeStyle>
                            Contact Us
                        </NavLink>
                        <NavLink to="/login" activeStyle>
                            Login
                        </NavLink>
                        <NavLink to="/sign-up" activeStyle>
                            Sign Up
                        </NavLink>
                    </NavMenu>
                </Nav>
            </>
        )
    }
};
 
export default Navbar;
