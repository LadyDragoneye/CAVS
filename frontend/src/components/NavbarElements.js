// Filename - ./components/Navbar.js
 
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: #4481b4;
    height: 85px;
    display: flex;
    padding: 0.1rem calc((100vw - 1000px) / 2);
    z-index: 12;
    font-family: "IBM Plex Serif", serif;
`;
 
export const NavLink = styled(Link)`
    color: #ffffff;
    display: flex;
    font-size: 32px;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #5ea5e0;
        text-decoration: none;
    }
    &:hover {
        transition: .2s all ease-in-out;
        color: #5ea5e0;
        background-color: #234d70;
        border-radius: 25px;
    }
    &:hover {
        transition: .2s all ease-in-out;
        color: white;
        text-decoration: none;
    }
`;
 
export const Bars = styled(FaBars)`
    display: none;
    color: #808080;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;
 
export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    /* Second Nav */
    /* margin-right: 24px; */
    /* Third Nav */
    /* width: 100vw;
    white-space: nowrap; */
    @media screen and (max-width: 768px) {
        display: none;
    }
`;