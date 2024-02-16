import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './reusables/navbar/NavBar';
import Footer from './reusables/footer/Footer';

import { GoogleOAuthProvider } from '@react-oauth/google';

const AppWithNavBar = () => {
  const location = useLocation();
  const hideNavBarRoutes = ['/cheer/login', '/cheer/signup']; // Add the routes that should not display the navbar
  const OAUTH_CLIENT_ID = "378445406446-am4uikvslek3och9rohrr6ct3fsic9jr.apps.googleusercontent.com"


  return (
    <>
      {!hideNavBarRoutes.includes(location.pathname) && <NavBar />}
      
        <GoogleOAuthProvider clientId={OAUTH_CLIENT_ID}>
          <App />
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
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
