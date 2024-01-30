import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom'


import Home from './pages/public/home/home'; // Fix the file name to be 'home' instead of 'Home'
import Gallery from './pages/public/gallery/Gallery'
import Schedule from './pages/public/schedule/Schedule'
import Login from './pages/public/login/Login'
import SignUp from './pages/public/signUp/SignUp'
import EmployeeHome from './pages/employee/EmployeeHome'
import AdminPage from './pages/admin/AdminHome'

const ROLES = {
  'User': 'User',
  'Admin': 'Admin',
  'Employee': 'Employee'
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cheer/Home"/>}></Route>
      {/* Public Routes */}
        <Route path='/cheer/home' element={<Home/>}></Route>
        <Route path='/cheer/gallery' element={<Gallery/>}></Route>
        <Route path='/cheer/schedule' element={<Schedule/>}></Route>
        <Route path='/cheer/login' element={<Login/>}></Route>
        <Route path='/cheer/sign-up' element={<SignUp/>}></Route>
      
      
      
      
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
