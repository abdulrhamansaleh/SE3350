import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NavBar from './reusables/navbar/NavBar';
import Footer from './reusables/footer/Footer';

const AppWithNavBar = () => {
  const location = useLocation();
  const hideNavBarRoutes = ['/cheer/login', '/cheer/signup', '/cheer/contact']; // Add the routes that should not display the navbar
  
  return (
    <>
      {!hideNavBarRoutes.includes(location.pathname) && <NavBar />}
      <App />
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

