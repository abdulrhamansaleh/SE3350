import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom'


import Home from './pages/public/home/home';
import Gallary from './pages/public/gallary/gallary'
import Schedule from './pages/public/schedule/schedule'
import Login from './pages/public/login/login'
import Signup from './pages/public/signup/signup'

import Employee_home from './pages/employee/employee_home'
import Admin_page from './pages/admin/admin_home'

const ROLES = {
  'User': 'User',
  'Admin': 'Admin',
  'Employee': 'Employee'
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cheer/home"/>}></Route>
      {/* Public Routes */}
        <Route path='/cheer/home' element={<Home/>}></Route>
        <Route path='/cheer/gallary' element={<Gallary/>}></Route>
        <Route path='/cheer/schedule' element={<Schedule/>}></Route>
        <Route path='/cheer/login' element={<Login/>}></Route>
        <Route path='/cheer/signup' element={<Signup/>}></Route>
      
      
      
      
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
