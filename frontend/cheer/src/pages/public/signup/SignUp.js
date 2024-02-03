import { React, useRef, useState } from 'react'
import './SignUp.css'
import { NavLink } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha"

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
    <div className='signup_background'>
      <div className='signup_container'>
        <form onSubmit={signup}>
          <p className='signup_header'>Welcome</p>
          <p className='signup_subheader'>Sign up</p>
          <input
          className='signup_input'
          type='text'
          id='email'
          placeholder='Email'
          value={data.email}
          onChange={(e) => setData({...data, email: e.target.value})}
          required
          />
          <input
          className='signup_input'
          type='password'
          id='password'
          placeholder='Password'
          value={data.password}
          onChange={(e) => setData({...data, password: e.target.value})}
          required
          />
          <p className='signup_info'>Why do you want to sign up? </p>
          <input
          className='signup_input'
          type='text'
          id='reason'
          placeholder='Type here...'
          value={data.reason}
          onChange={(e) => setData({...data, reason: e.target.value})}
          required
          />
          {/* <ReCAPTCHA ref={recaptcha} sitekey={process.env.REACT_APP_SITE_KEY} /> */}
          <button style={{"text-decoration": "none"}} className='entry_signup'>Sign up</button>
        </form>

          {/* <NavLink style={{"text-decoration": "none"}} className="entry_signup" onClick={signup} to="/cheer/page">Sign up</NavLink> */}
          {/* <NavLink style={{"text-decoration": "none"}} className="entry_signup" onClick={checkCaptcha}>Sign up</NavLink> */}
          <NavLink style={{"text-decoration": "none"}} className="entry_signup" to="/cheer/home">Return Home</NavLink>

          <p className='signup_subtext'>Forgot your password?</p>
          <p className='signup_subtext'>Already have an account? <b> <NavLink style={{"text-decoration": "none"}} className='signup_signin' to="/cheer/login">Sign in!</NavLink></b></p>
      </div>
    </div>
  )
}

export default Signup