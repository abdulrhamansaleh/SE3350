import React, {useEffect, useState} from 'react'
import './Auth.css'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useRef } from 'react'; // Import useRef hook
import HomeIcon from '../../../resources/images/homeicon.png'

import GoogleAuthLogin from './GoogleAuth';

 function Login({ setToken }) {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  async function loginUser(email, password) {

    const res = await fetch('/cheer/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
      return res.json()
   }

  const handleSubmit = async e => {
    e.preventDefault();
    loginUser({
        email: emailRef.current.value,
        password: passwordRef.current.value
      }).then((data) => {
        if (data.success) {
            setToken({loggedIn: true, account_id: data.account.account_id})
            navigate('/cheer/home')
        }
      })
  };

  return (
    <div className='auth-background'>
        <img 
            src={HomeIcon}
            alt="Home Icon"
            className="auth-home_icon"
            onClick={() => navigate('/cheer/home')}
        />
        <div className='auth-container'>
            <div className="login-header">
                <FontAwesomeIcon icon={faUser} className="login-user_icon" />
            </div>
            <h1 className='auth-h1'>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className="auth-input-container">
                    <button
                        aria-label="Focus email input" 
                        className="auth-icon_button" 
                        onClick={() => emailRef.current && emailRef.current.focus()}
                    >
                        <FontAwesomeIcon icon={faEnvelope} className="auth-icon" />
                    </button>
                    <input
                        className="auth-input"
                        type="email" 
                        ref={emailRef}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="auth-input-container">
                    <button
                        aria-label="Focus password input" 
                        className="auth-icon_button" 
                        onClick={() => passwordRef.current && passwordRef.current.focus()}
                    >
                        <FontAwesomeIcon icon={faLock} className="auth-icon" />
                    </button>
                    <input
                        className="auth-input"
                        type="password" 
                        ref={passwordRef}
                        placeholder="Password"
                        required
                    />
                </div>
                <button type="submit" className="auth-button">Log In</button>
            </form>
            <div>
                Login Using Google
                <GoogleAuthLogin />
            </div>
            {/* <p className='auth-subtext'>Forgot your password?</p> */}
            <p className='auth-subtext'>Don't have an account? <NavLink className='auth-switch' to="/cheer/signup">Sign up!</NavLink></p>
            <NavLink className='auth-switch' to="/cheer/home">Return Home</NavLink>
        </div>
    </div>
);
}

export default Login;