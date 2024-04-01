// Filename - "./components/Navbar.js
 
import React, {useContext} from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";
import AuthContext from "../context/AuthContext";
import logo from './CAVSlogo.png';

 
const Navbar = () => {
    return (
        
        <>
            <Nav>
            <a href='/'>
                <img src={logo} alt="CAVS logo" height={125} width={125}></img>
            </a>
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/about" activeStyle>
                        About
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
                    <NavLink to="/Cal" activeStyle>
                        Calendar
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;