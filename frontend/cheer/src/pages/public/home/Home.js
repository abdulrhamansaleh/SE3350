import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

import AboutUs from '../aboutus/AboutUs.js';
import ContactUs from '../contact/ContactUs.js';
import NewsletterModal from '../newsLetter/NewsletterModal.js';

// Import images
import placeholderImage from '../../../resources/images/placeholder1.jpg';
import logoImage from '../../../resources/images/cheergroup.png';

function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setShowModal(false);

  return (
    <div className='home-background'>
      {showModal && <NewsletterModal onClose={handleClose} />}
      <div className='home-main-container'>
        <div className='overlay'></div> {/* Overlay div */}
        <div className='landing-section'>
          <h1 className='landing-title'>C.H.E.E.R</h1>
          <p className='landing-subtitle'>Empowering Lives, Building Community</p>
          <NavLink className="main-entry-button" to="/cheer/signup">Sign Up!</NavLink>
        </div>
      </div>
      <AboutUs />
      {/* Add ContactUs and other sections as needed */}
    </div>
  );
}
export default Home;