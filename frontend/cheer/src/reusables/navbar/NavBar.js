import React, {useEffect, useState} from 'react';
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
    faClock,
} from '@fortawesome/free-solid-svg-icons';
import { googleLogout } from '@react-oauth/google';


const NavBar = ({token, setToken}) => {

    const [isClockedIn, setIsClockedIn] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [timeSheetId, setTimeSheetId] = useState(-1)

    useEffect(()=>{
        getTimeSheetId()
    }, [startTime])

    async function startClock() {

        let currentTime = new Date()

        const res = await fetch('/clockIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accountId: token.accountId,
                clockIn: currentTime,
                clockOut: currentTime,
            })
        })

        setStartTime(currentTime)
        
        return res.json()
    }

    async function stopClock() {

        let currentTime = new Date()

        const res = await fetch('/clockOut', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timeSheetId: timeSheetId,
                clockOut: currentTime,
            })
        })
        return res.json()
    }

    async function getIdUsingTimeStamps() {
        const res = await fetch('/findTimeSheetId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                startTime: startTime
            })
        })
        return res.json()

    }

    const handleClockIn = (e) => {
        e.preventDefault();
        startClock().then((data) => {
            if (data.success) {
                setIsClockedIn(true)
            }            
        })
    }

    const handleClockOut = (e) => {
        e.preventDefault();
        stopClock().then((data) => {
            console.log(data)
            if (data.success) {
                setIsClockedIn(false)
            }
            
        })
    }

    const getTimeSheetId = () => {
        getIdUsingTimeStamps().then((data) => {
            if (data.success) {
                setTimeSheetId(data.data)
            }  
        })
    }


    const onLogOut = () => {
        googleLogout();
    }

    const handleLogOut = () => {
        setToken({loggedIn: false, accountId: -1, type: ''})
    }

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

                    {
                        token?.loggedIn && !isClockedIn && token?.type === 'employee' &&
                        <li className='navbar_list_items login_button'>
                            <NavLink className="nav_link">
                                <button onClick = {handleClockIn} className='clock-in'>
                                    <FontAwesomeIcon icon={faClock} /> Clock-In
                                </button>
                            </NavLink>
                        </li>
                    }

                    {
                        token?.loggedIn && isClockedIn && token?.type === 'employee' &&
                        <li className='navbar_list_items login_button'>
                            <NavLink className="nav_link">
                                <button onClick = {handleClockOut} className='clock-in'>
                                    <FontAwesomeIcon icon={faClock} /> Clock-Out
                                </button>
                            </NavLink>
                        </li>
                    }

                    {
                        !token?.loggedIn && 
                        <li className='navbar_list_items login_button'>
                            <NavLink className="nav_link" to="/cheer/login">
                                <FontAwesomeIcon icon={faSignInAlt} /> Login
                            </NavLink>
                        </li>
                    }

                    {
                        token?.loggedIn && 
                        <li className='navbar_list_items login_button'>
                            <NavLink className="nav_link">
                                <button onClick = {handleLogOut} className='clock-in'>
                                    <FontAwesomeIcon icon={faSignInAlt} /> Logout
                                </button>
                            </NavLink>
                        </li>
                    }
                    
                    <li className='navbar_list_items'>
                        <NavLink style={{"text-decoration": "none"}} className="nav_link" to="/parent/register-my-child">Register Child</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;
