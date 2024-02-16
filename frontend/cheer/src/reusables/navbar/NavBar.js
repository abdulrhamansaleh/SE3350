import React from 'react'
import './NavBar.css'
import { NavLink } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google';


const NavBar = () => {

    const onLogOut = () => {
        googleLogout();
    }
    return(
        <div className='nav_background'>
            <div className='nav_container'>
                <ul className='navbar_list'>
                    <li className='navbar_list_items'>
                        <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/cheer/home">CHEER</NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/cheer/events">Events</NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/cheer/donate">Donate</NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/cheer/contact">Contact Us</NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/cheer/gallery">Gallery</NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/cheer/login">Login</NavLink>
                    </li>
                    {/* 
                        <li className='navbar_list_items'>
                            <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/register/child">Register Child</NavLink>
                        </li>
                    */}
                    {/* Only Allow for users logged in using GoogleAuth*/}
                    <li className='navbar_list_items'>
                        <button type = "Submit" onClick={onLogOut}>
                            Log Out
                        </button>
                    </li>
                </ul>
                
            </div>
        </div>
    )
}

export default NavBar