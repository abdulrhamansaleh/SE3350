import { React, useRef, useState } from 'react'
import './Auth.css'
import { NavLink } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import HomeIcon from '../../../resources/images/homeicon.png'

function Signup() {
  const recaptcha = useRef();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

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
    <div className='auth-background'>
      <img 
          src={HomeIcon}
          alt="Home Icon"
          className="auth-home_icon"
          onClick={() => navigate('/cheer/home')}
        />
      <div className='auth-container'>
        <div className='signup-icon'>
          <FontAwesomeIcon icon={faUserPlus} />
        </div>
        <h1 className='auth-h1'>Sign Up</h1>
        <form onSubmit={signup}>
          <div className="auth-input-container">
            <button
              aria-label="Focus email input" 
              className="auth-icon_button" 
              onClick={() => emailRef.current && emailRef.current.focus()}
            >
              <FontAwesomeIcon icon={faEnvelope} className="auth-icon" />
            </button>
            <input
              className='auth-input'
              type='email'
              ref={emailRef}
              placeholder='Email'
              id='email'
              value={data.email}
              onChange={(e) => setData({...data, email: e.target.value})}
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
              className='auth-input'
              type='password'
              ref={passwordRef}
              placeholder='Password'
              id='password'
              value={data.password}
              onChange={(e) => setData({...data, password: e.target.value})}
              required
            />
          </div>
          <div className="auth-input-container">
            <input
              className='auth-input'
              type='text'
              // ref={textRef}
              placeholder='Reason for signing up'
              id='reason'
              value={data.reason}
              onChange={(e) => setData({...data, reason: e.target.value})}
              required
            />
          </div>
          <button className='auth-button'>Sign Up</button>
        </form>
        <p className='auth-subtext'>Already have an account? <NavLink className='auth-switch' to="/cheer/login">Sign in!</NavLink></p>
      </div>
    </div>
  );
}

export default Signup;