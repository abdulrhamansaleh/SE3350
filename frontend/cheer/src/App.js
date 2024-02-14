import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';

import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom'


import Home from './pages/public/home/Home'; // Fix the file name to be 'home' instead of 'Home'
import Gallery from './pages/public/gallery/Gallery'
import Schedule from './pages/public/schedule/Schedule'
import Login from './pages/public/auth/Login'
import SignUp from './pages/public/auth/SignUp'
import EmployeeHome from './pages/employee/EmployeeHome'
import NewsletterUpload from './pages/admin/NewsletterUpload'
import AdminHome from './pages/admin/AdminHome'
import useToken from './reusables/tokenHook/useToken';
import ChildRegistration from './pages/parent/ChildSignup';

const ROLES = {
  'User': 'User',
  'Admin': 'Admin',
  'Employee': 'Employee'
}

function App() {

  const { token, setToken } = useToken();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cheer/Home"/>}></Route>
      {/* Public Routes */}
        <Route path='/cheer/home' element={<Home/>}></Route>
        <Route path='/cheer/gallery' element={<Gallery/>}></Route>
        <Route path='/cheer/schedule' element={<Schedule/>}></Route>
        <Route path='/cheer/login' element={<Login setToken = {setToken} token = {token}/>}></Route>
        <Route path='/cheer/signup' element={<SignUp setToken = {setToken} token = {token}/>}></Route>
      
        // once authentication is established, place this under protected admin routes
        <Route path='/admin' element={<AdminHome/>}></Route>
        <Route path='/admin/upload-newsletter' element={<NewsletterUpload/>}></Route>
      
        // child registration and authentication
        <Route path="/parent/register-my-child" element = {<ChildRegistration />}></Route>
        {/* <Route path="/child/sign-in" element = {<AuthenticateChild />}></Route> */} 
      
      {/* Protected Routes For Accounts*/}
      {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          
      </Route> */}


      {/* Protected Routes For Employees*/}
      {/* <Route element={<RequireAuth allowedRoles={[ROLES.Employee]} />}>
          
       </Route> */}


      {/* Protected Routes For Admin*/}
      {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
         
       </Route> */}

    </Routes>
  );
}

export default App;
