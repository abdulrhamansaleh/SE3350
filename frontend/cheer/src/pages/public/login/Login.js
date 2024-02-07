import React, {useState} from 'react'
import './Login.css'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useRef } from 'react'; // Import useRef hook
import HomeIcon from '../../../resources/images/homeicon.png'

async function loginUser(username, password) {
  

  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password,
    })
  })
    .then(data => data.json())
 }

 function Login({ setToken }) {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
    setToken(token);
  };


  return (
    <div className='login-background'>
        <img 
            src={HomeIcon}
            alt="Home Icon"
            className="login-home_icon"
            onClick={() => navigate('/cheer/home')}
        />
        <div className='login-container'>
            <div className="login-header">
                <FontAwesomeIcon icon={faUser} className="login-user_icon" />
            </div>
            <h1 className='login-h1'>Log In</h1>
            <form onSubmit={handleSubmit}>
                <div className="login-input_container">
                    <button
                        aria-label="Focus email input" 
                        className="login-icon_button" 
                        onClick={() => emailRef.current && emailRef.current.focus()}
                    >
                        <FontAwesomeIcon icon={faEnvelope} className="login-icon" />
                    </button>
                    <input 
                        type="email" 
                        ref={emailRef}
                        required
                        placeholder="Email"
                        className="login-input"
                    />
                </div>
                <div className="login-input_container">
                    <button
                        aria-label="Focus password input" 
                        className="login-icon_button" 
                        onClick={() => passwordRef.current && passwordRef.current.focus()}
                    >
                        <FontAwesomeIcon icon={faLock} className="login-icon" />
                    </button>
                    <input 
                        type="password" 
                        ref={passwordRef}
                        required
                        placeholder="Password"
                        className="login-input"
                    />
                </div>
                <button type="submit" className="login-button">Submit</button>
            </form>
            <p>Don't have an account? <NavLink className='login-signin' to="/cheer/signup">Sign Up!</NavLink></p>
        </div>
    </div>
);
}

export default Login;