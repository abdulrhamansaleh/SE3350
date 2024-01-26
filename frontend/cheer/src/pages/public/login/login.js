import React from 'react'
import './login.css'
import { NavLink } from 'react-router-dom'


function login() {
  return (
    <div className='login_background'>
      <div className='login_container'>
          <p className='login_header'>Welcome</p>
          <p className='login_subheader'>Sign in</p>
          <input className='login_input' placeholder='Username' type="text"></input>
          <input className='login_input' placeholder='Password' type="password"></input>

          <NavLink style={{"text-decoration": "none"}} className="entry_login" to="/cheer/page">Sign in</NavLink>

          <p className='login_subtext'>Forgot your password?</p>
          <p className='login_subtext'>Dont have an Account? <b>Register here!</b></p>
      </div>
    </div>
  )
}

export default login