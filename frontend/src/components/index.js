// Filename - "./components/Navbar.js
 
import React from "react";
import { Nav, NavLink, NavMenu} from "./NavbarElements";
import logo from './CAVSlogo.png';
 
const Navbar = () => {
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
