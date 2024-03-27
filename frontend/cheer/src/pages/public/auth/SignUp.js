import { React, useRef, useState } from 'react'
import InputMask from 'react-input-mask';
import './Auth.css'
import { NavLink } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLock, faPenToSquare, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import HomeIcon from '../../../resources/images/homeicon.png'

function Signup({ setToken }) {
  const recaptcha = useRef();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const textRef = useRef(null);
  const passwordRef = useRef(null);
  const cpasswordRef = useRef(null);

  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,16}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  // const history = useHistory();

  const [data, setData] = useState ({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    password: '',
    cpassword: '',
    reason: '',
    isVerified: false
  })

  const validateForm = () => {
    let isValid = true;

    // Email validation
    if (!data.email.match(emailRegex)) {
        setEmailError('Email is invalid');
        isValid = false;
    } else {
        setEmailError('');
    }

    // Password validation
    if (!data.password.match(passwordRegex)) {
        setPasswordError('Password must be 6-16 character long and must contain at least one number and special character');
        isValid = false;
    } else {
        setPasswordError('');
    }

    // Password validation
    if (data.password !== data.cpassword) {
      setPasswordMatchError('Both passwords must be the same');
      isValid = false;
    } else {
        setPasswordMatchError('');
    }

    return isValid;
  };

  async function signUpPost() {

    if (validateForm()) {
      return fetch('/cheer/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(data => {
          console.log(data)
          if (data.status === 200) {
              setToken({loggedIn: true})
              navigate('/cheer/home')
          }
      })
    } else {
      alert('Form fields are filled out incorrectly')
    }
  }

  const signUpOnClick = async e => {
    e.preventDefault();
    const token = await signUpPost();
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
        <h1 className='auth-h1'>Sign Up  <FontAwesomeIcon icon={faUserPlus} /></h1>
        <form >
        {/* onSubmit={signup} */}
        <div className='auth-input-container-full'>
            <div className="auth-input-container-half">
              <input
                className='auth-input-half'
                type='text'
                ref={fnameRef}
                placeholder='First name'
                id='fname'
                value={data.fname}
                onChange={(e) => setData({...data, fname: e.target.value})}
                required
              />
            </div>
            <div className="auth-input-container-half">
              <input
                className='auth-input-half'
                type='text'
                ref={lnameRef}
                placeholder='Last name'
                id='lname'
                value={data.lname}
                onChange={(e) => setData({...data, lname: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="signup-input-container">
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
          {/* Display email error message */}
          {emailError && <p className='auth-subtext'>{emailError}</p>}
          <div className="signup-input-container">
            <button
              aria-label="Focus phone input" 
              className="auth-icon_button" 
              onClick={() => phoneRef.current && phoneRef.current.focus()}
            >
              <FontAwesomeIcon icon={faPhone} className="auth-icon" />
            </button>
            <InputMask
              className='auth-input'
              mask="(999) 999-9999"
              maskChar="_"
              inputRef={phoneRef}
              placeholder='Phone number'
              id='phone'
              value={data.phone}
              onChange={(e) => setData({...data, phone: e.target.value})}
              required
            />
          </div>
          <div className="signup-input-container">
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
          {/* Display password error message */}
          {passwordError && <p className='auth-subtext'>{passwordError}</p>}
          <div className="signup-input-container">
            <button
              aria-label="Focus confirm password input" 
              className="auth-icon_button" 
              onClick={() => cpasswordRef.current && cpasswordRef.current.focus()}
            >
              <FontAwesomeIcon icon={faLock} className="auth-icon" />
            </button>
            <input
              className='auth-input'
              type='password'
              ref={cpasswordRef}
              placeholder='Confirm password'
              id='cpassword'
              value={data.cpassword}
              onChange={(e) => setData({...data, cpassword: e.target.value})}
              required
            />
          </div>
          {/* Display password error message */}
          {passwordMatchError && <p className='auth-subtext'>{passwordMatchError}</p>}
          <div className="signup-input-container">
            <button
              aria-label="Focus reason input" 
              className="auth-icon_button" 
              onClick={() => textRef.current && textRef.current.focus()}
            >
              <FontAwesomeIcon icon={faPenToSquare} className="auth-icon" />
            </button>
            <input
              className='auth-input'
              type='text'
              ref={textRef}
              placeholder='Reason for signing up'
              id='reason'
              value={data.reason}
              onChange={(e) => setData({...data, reason: e.target.value})}
            />
          </div>
          <div className="recaptcha-container">
            <ReCAPTCHA
              ref={recaptcha}
              sitekey={process.env.REACT_APP_SITE_KEY}
            />
          </div>
          <br />
          <button onClick = {signUpOnClick} className='auth-button'>Sign Up</button>
        </form>
        <p className='auth-subtext'>Already have an account? <NavLink className='auth-switch' to="/cheer/login">Sign in!</NavLink></p>
        <NavLink className='auth-switch' to="/cheer/home">Return Home</NavLink>
      </div>
    </div>
  );
}

export default Signup;