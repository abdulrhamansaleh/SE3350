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
    const operationHours = {
      CHEERGroup: {
          Monday: "8:00-4:00",
          Tuesday: "8:00-4:00",
          Wednesday: "10:00-4:00",
          Thursday: "8:00-4:00",
          Friday: "8:00-4:00",
          Saturday: "CLOSED",
          Sunday: "CLOSED",
          note: "*outing times may differ*"
      },
      CHEERConnections: {

          Friday: "Summer Nights from 5:00-9:00 pm"
  
      },
      CHEERWorks: {
          Monday: "CLOSED",
          Tuesday: "CLOSED",
          Wednesday: "10:00-8:00",
          Thursday: "10:00-8:00",
          Friday: "10:00-8:00",
          Saturday: "8:00-8:00",
          Sunday: "8:00-8:00",
          note: "*Hours may differ for long weekends*",
          openingDate: "*Store opens May 18th 2024*"
      }
  };

    const location = {
        address: '8685 Rockglen Rd. Arkona ON, N0M 1B0',
        map: {
            lat: 43.082300,
            lng: -81.820580,
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
              <p><FontAwesomeIcon icon={faEnvelope} />  ongoinglivinglearning@gmail.com</p>
              <p><FontAwesomeIcon icon={faPhone} /> 666-666-666</p>
              <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 8685 Rockglen Rd. Arkona ON, N0M 1B0</p>
            </div>
        </div>
        <div className="operation-hours-container">
            <div className="operation-hours-section cheer-group">
                <h3>CHEER Group</h3>
                {Object.entries(operationHours.CHEERGroup).map(([day, hours]) => (
                    <p key={day}><strong>{day}:</strong> {hours}</p>
                ))}
            </div>
            <div className="operation-hours-section cheer-connections">
                <h3>CHEER Connections</h3>
                {Object.entries(operationHours.CHEERConnections).map(([day, hours]) => (
                    <p key={day}><strong>{day}:</strong> {hours}</p>
                ))}
            </div>
            <div className="operation-hours-section cheer-works">
                <h3>CHEER Works</h3>
                {Object.entries(operationHours.CHEERWorks).map(([day, hours]) => (
                    <p key={day}><strong>{day}:</strong> {hours}</p>
                ))}
            </div>
        </div>
        <div className="contact-map">
          <Map location={location} zoomLevel={17} />
          </div>
    </div>
  );
};

export default ContactUs;
