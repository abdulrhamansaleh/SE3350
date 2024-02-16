import React, { useState, useEffect, useRef } from "react";
import './ContactUs.css'; // Import the CSS file
import Map from "../../../reusables/map/Map";
import {email_service} from '../../../reusables/email/email_service'
// Ensure you've imported FontAwesome icons in your project
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt, faComments } from '@fortawesome/free-solid-svg-icons';
const ContactUs = () => {
    const [success,setSuccess] = useState(null)
    const cheerEmail = 'abcgef@gmail.com'
    const ref = useRef()
    const location = {
        address: '1151 Richmond St, London, ON N6A 3K7',
        map: {
            lat: 43.00973825943151,
            lng: -81.27376578080369,
        }
    } 
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        setSuccess(email_service(ref.current))
    }

  return (
    <div className='contact-background'> 
      <div className="contact-header-container">
      {/* Put your header content here */}
        <h1>CONTACT US</h1>
          <a href="/cheer/home" className="contact-go-home">← Go Back Home </a>
          {/* Add your icons wrapped in <a> tags for external links or <Link> for internal navigation */}
        <div className="contact-social-icons">
          {/* Example for external links */}
          <a href="your-facebook-link" target="_blank" rel="noopener noreferrer">
            {/* FontAwesomeIcon for Facebook */}
          </a>
          {/* Repeat for other icons */}
    </div>
      </div>
        <div className="contact-card">   
          
            <div className="contact-form-section">
              {/* Form fields */}
              <form ref={ref}  onSubmit={handleSubmit}>
                <div className="contact-form-header">
                <FontAwesomeIcon icon={faComments} className="contact-icon" />
                <h2>Get in Touch</h2>
              </div>
                <div className="contact-form-field">
                  <input type="text" placeholder="Your Name (Required) " />
                </div>
                <div className="contact-form-field">
                  <input type="email" placeholder="Email Address (Required)" />
                </div>
                <div className="contact-form-field">
                  <textarea placeholder="Message"></textarea>
                </div>
                <button type="submit" className="contact-submit-btn">Send Now</button>
              </form>
              {success==null? <div/> : success ? <p className="contact_result_text">Your message has been sent!</p>:<p className="contact_result_text">Something went wrong, please try again later</p>}
            </div>
            <div className="contact-info-section">
              {/* Contact information and icons */}
              <p><FontAwesomeIcon icon={faEnvelope} /> user@gmail.com</p>
              <p><FontAwesomeIcon icon={faPhone} /> 666-666-666</p>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 1151 Richmond St, London</p>
            </div>
        </div>
        <div className="contact-map">
          <Map location={location} zoomLevel={17} />
          </div>
    </div>
  );
};

export default ContactUs;
