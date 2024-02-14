import React, {useState} from 'react'
import './Auth.css'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { useRef } from 'react'; // Import useRef hook
import HomeIcon from '../../../resources/images/homeicon.png'

 function Login({ setToken }) {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  async function loginUser(email, password) {

    return fetch('/cheer/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
      .then(data => {
          if (data.status === 200) {
              setToken({loggedIn: true})
              navigate('/cheer/home')
          }
      })
   }

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
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
            {/* <p className='auth-subtext'>Forgot your password?</p> */}
            <p className='auth-subtext'>Don't have an account? <NavLink className='auth-switch' to="/cheer/signup">Sign up!</NavLink></p>
            <NavLink className='auth-switch' to="/cheer/home">Return Home</NavLink>
        </div>
    </div>
);
}

export default Login;