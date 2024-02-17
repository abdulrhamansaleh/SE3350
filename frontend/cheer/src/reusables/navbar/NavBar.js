import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, 
    faCalendarAlt, 
    faDonate, 
    faEnvelope, 
    faImages, 
    faSignInAlt
} from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    return (
        <div className='nav_background'>
            <div className='nav_container'>
                {/* Navigation menu */}
                <ul className="navbar_list">
                    <li className='navbar_list_items'>
                        <NavLink className="nav_link" to="/cheer/home">
                            <FontAwesomeIcon icon={faHome} /> CHEER
                        </NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink className="nav_link" to="/cheer/events">
                            <FontAwesomeIcon icon={faCalendarAlt} /> Events
                        </NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink className="nav_link" to="/cheer/donate">
                            <FontAwesomeIcon icon={faDonate} /> Donate
                        </NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink className="nav_link" to="/cheer/contact">
                            <FontAwesomeIcon icon={faEnvelope} /> Contact Us
                        </NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink className="nav_link" to="/cheer/gallery">
                            <FontAwesomeIcon icon={faImages} /> Gallery
                        </NavLink>
                    </li>
                    <li className='navbar_list_items login_button'>
                        <NavLink className="nav_link" to="/cheer/login">
                            <FontAwesomeIcon icon={faSignInAlt} /> Login
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;
