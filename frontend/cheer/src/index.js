import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter, Route, Routes, Navigate, Outlet} from 'react-router-dom'

import NavBar from './reusables/navbar/NavBar'
import Footer from './reusables/footer/Footer'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <AuthProvider> */}
      <NavBar/>
        <Routes>
          <Route path="/*" element={<App />}/>
        </Routes>
      <Footer/>
      {/* </AuthProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
