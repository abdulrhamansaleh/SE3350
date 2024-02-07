import { React, useRef, useState } from 'react'
import './SignUp.css'
import { NavLink } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUserPlus  } from '@fortawesome/free-solid-svg-icons';

function Signup() {
  const recaptcha = useRef();
  // const history = useHistory();

  const [data, setData] = useState ({
    email: '',
    password: '',
    reason: '',
    isVerified: false
  })

  const [error, setError] = useState(null);

  const signup = async (e) => {
    // prevent page from automatically loading
    e.preventDefault()

    const {email, password, reason} = data
    try {
        const response = await fetch('/cheer/signup', {
        // const response = ({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                reason,
                isVerified: data.isVerified
            }),
        });
        if (!response.ok) {
          console.error('Error:', response.status, response.statusText);
          setError('Server error');
          return;
        }
    
        const responseData = await response.json();
    
        console.log('Response data:', responseData);
    
        if (responseData.error) {
          setError(responseData.error);
        } else {
          // Redirect or handle success as needed
          window.location.href = '/cheer/login';
        }
        /*
        if (response.ok) {
            const responseData = await response.json();
            console.log('Response data:', responseData);
            if (responseData.error) {
                NavLink('/cheer/page');
                // history.push('/cheer/page');
                setError(responseData.error);
            } else {
                NavLink('/cheer/login');
                // history.push('/cheer/page');
            }
        } else {
            console.error('Error:', response.statusText);
            setError('Server error');
        }
        */
    } catch (error) {
        console.log('Catch block error', error)
        setError('Server unreachable');
    }
  }
// 
  async function checkCaptcha(event) {
    event.preventDefault();
    const captchaValue = recaptcha.current.getValue();
    if (!captchaValue) {
      alert("Please verify using the reCAPTCHA!");
    } else {
      alert("Success!");
    }
  }
  // 
  return (
    <div className='signup-background'>
      <div className='signup-container'>
        <div className='signup-icon'>
        <FontAwesomeIcon icon={faUserPlus} />
        </div>
        <h1 className='signup-title'>Sign Up</h1>
        <form className='signup-form' onSubmit={signup}>
          <div className="signup-input-container">
            <input
              className='signup-input'
              type='text'
              id='email'
              placeholder='Email'
              value={data.email}
              onChange={(e) => setData({...data, email: e.target.value})}
              required
            />
          </div>
          <div className="signup-input-container">
            <input
              className='signup-input'
              type='password'
              id='password'
              placeholder='Password'
              value={data.password}
              onChange={(e) => setData({...data, password: e.target.value})}
              required
            />
          </div>
          <div className="signup-input-container">
            <input
              className='signup-input'
              type='text'
              id='reason'
              placeholder='Reason for signing up'
              value={data.reason}
              onChange={(e) => setData({...data, reason: e.target.value})}
              required
            />
          </div>
          <button className='signup-button'>Sign Up</button>
        </form>
        <p className='signup-subtext'>Forgot your password?</p>
        <p className='signup-subtext'>Already have an account? <NavLink className='signup-signin' to="/cheer/login">Sign in!</NavLink></p>
      </div>
    </div>
  );
}

export default Signup;