import React, { useEffect } from 'react'
import './Home.css'

import { NavLink } from 'react-router-dom'

import AboutUs from '../aboutus/AboutUs.js'
import ContactUs from '../contact/ContactUs.js'
import NewsletterModal from '../newsLetter/NewsletterModal.js'
import i1 from '../../../resources/images/placeholder1.jpg'

function Home() {
  const [showModal, setShowModal] = React.useState(false);
  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className='home_background'>
      {showModal && <NewsletterModal onClose={handleClose} />}
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