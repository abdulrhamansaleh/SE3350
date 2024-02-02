import React, { useState, useEffect } from 'react';
import './Home.css'

import { NavLink } from 'react-router-dom'

import AboutUs from '../aboutus/AboutUs.js'
import ContactUs from '../contact/ContactUs.js'
import NewsletterModal from '../newsLetter/NewsletterModal.js';

import i1 from '../../../resources/images/placeholder1.jpg'

function Home() {
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const userIsLoggedIn = true; // Replace later with logic check
  const userIsSubscribed = false; // Replace with subscription check

  // Effect to check if we should show the newsletter modal
  useEffect(() => {
    if (userIsLoggedIn && !userIsSubscribed) {
      setShowNewsletterModal(true);
    }
  }, [userIsLoggedIn, userIsSubscribed]);
  // Handle the subscription logic
  const handleSubscribe = async () => {
    try {
      // Replace with the actual API call to your backend
      const response = await fetch('/api/subscribe-to-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include other headers as needed, like authorization tokens
        },
        body: JSON.stringify({
          // Include the necessary user data, like user ID
        }),
      });
      const data = await response.json();
      if (data.success) {
        // Handle successful subscription here
        setShowNewsletterModal(false);
      } else {
        // Handle errors here
        console.error('Subscription failed:', data.error);
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
    }
  };
  return (
    <div className='home_background'>
      {/* Render the NewsletterModal */}
      {showNewsletterModal && (
        <NewsletterModal
          isOpen={showNewsletterModal}
          onClose={() => setShowNewsletterModal(false)}
          onSubscribe={handleSubscribe}
        />
      )}
      <div className='home_main_container'>
        <div className='home_left_container'>
          <h1 className='home_main_header'>Welcome to C.H.E.E.R</h1>
          <p className='home_main_p'>Explore and Connect</p>
          <h2 className='home_sub_header'>Discover a Community of Learning and Fun!</h2>
          <div className='main_entry_container'>
            <NavLink style={{"text-decoration": "none"}} className="main_entry_button" to="/cheer/login">Login</NavLink>
            <NavLink style={{"text-decoration": "none"}} className="main_entry_button" to="/cheer/signup">Signup</NavLink>
          </div>
        </div>
        <div className='home_right_container'>
            <img className='home_main_image' src={i1} alt="PH1"></img>
        </div>
      </div>
      <AboutUs/>
      <ContactUs/>
    </div>
  )
}

export default Home