import { React, useRef, useState } from 'react'
import InputMask from 'react-input-mask';
import './Auth.css'
import { NavLink } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLock, faPenToSquare, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import HomeIcon from '../../../resources/images/homeicon.png'

function Signup() {
  const recaptcha = useRef();
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const fnameRef = useRef(null);
  const lnameRef = useRef(null);
  const textRef = useRef(null);
  const passwordRef = useRef(null);
  const cpasswordRef = useRef(null);

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

  const [error, setError] = useState(null);

  const signup = async (e) => {
    // prevent page from automatically loading
    e.preventDefault()

    if (data.password !== data.cpassword) {
      alert("Passwords do not match");
      return;
    }

    // const captchaValue = recaptcha.current.getValue();
    // if (!captchaValue) {
    //   alert("Please verify using the reCAPTCHA!");
    //   return;
    // }

    const {fname, lname, email, phone, password, cpassword, reason} = data
    try {
        const response = await fetch('/cheer/signup', {
        // const response = ({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fname,
                lname,
                email,
                phone,
                password,
                cpassword,
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
        <form onSubmit={signup}>
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
              ref={phoneRef}
              placeholder='Phone number'
              id='phone'
              value={data.phone}
              onChange={(e) => setData({...data, phone: e.target.value})}
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
          <div className="auth-input-container">
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
          <button className='auth-button'>Sign Up</button>
          <br /> <br />
          {/* <ReCAPTCHA ref={recaptcha} sitekey={process.env.REACT_APP_SITE_KEY} /> */}
        </form>
        <p className='auth-subtext'>Already have an account? <NavLink className='auth-switch' to="/cheer/login">Sign in!</NavLink></p>
        <NavLink className='auth-switch' to="/cheer/home">Return Home</NavLink>
      </div>
    </div>
  );
}

export default Signup;