import React, {useState} from 'react'
import './Login.css'
import { NavLink } from 'react-router-dom'


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

function Login(props) {
  
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const userNameOnChange = (e) => {setUserName(e.target.value)}
  const passwordOnChange = (e) => {setPassword(e.target.value)}

  const handleSubmit = async e => {
    e.preventDefault();
    if (props.token === "false") {
      
    }
    const token = await loginUser(username,password);
    props.setToken(token);
  }

  return (
    <div className='login_background'>
      <div className='login_container'>
          <p className='login_header'>Welcome</p>
          <p className='login_subheader'>Sign in</p>

          <form onSubmit = {handleSubmit}>
            <label>
              <p>Username</p>
              <input onChange = {userNameOnChange} className='login_input' type="text" placeholder='Username'/>
            </label>
            <label>
              <p>Password</p>
              <input onChange = {passwordOnChange} className='login_input' type="password" placeholder='Password'/>
            </label>
            <button type="submit">Submit</button>
          </form>

          {/* <input onChange = {userNameOnChange} className='login_input' placeholder='Username' type="text"></input>
          <input onChange = {passwordOnChange} className='login_input' placeholder='Password' type="password"></input> */}
          <br></br>
          <NavLink style={{"text-decoration": "none"}} className="entry_login" to="/cheer/home">Return Home</NavLink>
          {/* <NavLink style={{"text-decoration": "none"}} className="entry_login" to="/cheer/page">Return Home</NavLink> */}

          <p className='login_subtext'>Forgot your password?</p>
          <p className='login_subtext'>Don't have an account? <b> <NavLink style={{"text-decoration": "none"}} className='login_signin' to="/cheer/signup">Register here!</NavLink></b></p>
      </div>
    </div>
  )
}

export default Login