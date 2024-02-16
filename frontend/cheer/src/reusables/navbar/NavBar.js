import React, { useState } from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faHome, 
    faCalendarAlt, 
    faDonate, 
    faEnvelope, 
    faImages, 
    faSignInAlt,
    faBars // Import the bars icon for the hamburger menu
} from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    const [isNavExpanded, setIsNavExpanded] = useState(false); // State to handle the nav expansion

    return (
        <div className='nav_background'>
            <div className='nav_container'>
                <FontAwesomeIcon icon={faBars} className="hamburger_icon" onClick={() => { setIsNavExpanded(!isNavExpanded); console.log('Clicked!'); }} />

                <ul className={`navbar_list ${isNavExpanded ? "responsive" : ""}`}>
                    <li className='navbar_list_items'>
                        <NavLink className="nav_link" to="/cheer/home" onClick={() => setIsNavExpanded(false)}>
                            <FontAwesomeIcon icon={faHome} /> CHEER
                        </NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink className="nav_link" to="/cheer/events" onClick={() => setIsNavExpanded(false)}>
                            <FontAwesomeIcon icon={faCalendarAlt} /> Events
                        </NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink className="nav_link" to="/cheer/donate" onClick={() => setIsNavExpanded(false)}>
                            <FontAwesomeIcon icon={faDonate} /> Donate
                        </NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink className="nav_link" to="/cheer/contact" onClick={() => setIsNavExpanded(false)}>
                            <FontAwesomeIcon icon={faEnvelope} /> Contact Us
                        </NavLink>
                    </li>
                    <li className='navbar_list_items'>
                        <NavLink className="nav_link" to="/cheer/gallery" onClick={() => setIsNavExpanded(false)}>
                            <FontAwesomeIcon icon={faImages} /> Gallery
                        </NavLink>
                    </li>
                    <li className='navbar_list_items login_button'>
                        <NavLink className="nav_link" to="/cheer/login" onClick={() => setIsNavExpanded(false)}>
                            <FontAwesomeIcon icon={faSignInAlt} /> Login
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;
