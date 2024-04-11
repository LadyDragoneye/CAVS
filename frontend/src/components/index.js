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
<<<<<<< HEAD
                    <NavLink to="/Cal" activeStyle>
=======
                         <NavLink to="/Cal" activeStyle>
>>>>>>> 649dbf53cfcd7d093e52c571ce8ee81ce9c1a004
                        Calendar
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;
