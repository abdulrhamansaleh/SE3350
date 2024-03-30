import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './reusables/navbar/NavBar';
import Footer from './reusables/footer/Footer';

import useToken from './reusables/tokenHook/useToken'

import { GoogleOAuthProvider } from '@react-oauth/google';
import MobileNavBar from './reusables/navbar/MobileNavBar';
const AppWithNavBar = () => {
  const location = useLocation();
  const hideNavBarRoutes = ['/cheer/login', '/cheer/signup', '/cheer/contact']; // Add the routes that should not display the navbar
  const OAUTH_CLIENT_ID = "378445406446-am4uikvslek3och9rohrr6ct3fsic9jr.apps.googleusercontent.com"

  const [token, setToken] = useToken('token', {loggedIn: false, accountId: -1, type: ''})

  return (
    <>
      {!hideNavBarRoutes.includes(location.pathname) && (
        <>
          <div className="desktop-nav-bar"> {/* Updated class name */}
            <NavBar setToken = {setToken} token = {token}/>
          </div>
          <div className="mobile-nav-bar"> {/* Updated class name */}
            <MobileNavBar setToken = {setToken} token = {token}/>
          </div>
        </>
      )}
      
        <GoogleOAuthProvider clientId={OAUTH_CLIENT_ID}>
          <App setToken = {setToken} token = {token}/>
        </GoogleOAuthProvider>
    </>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/*" element={<AppWithNavBar />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();

