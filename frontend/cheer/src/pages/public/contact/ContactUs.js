import React, { useState, useEffect, useRef } from "react";
import {email_service} from '../../../reusables/email/email_service'

import Map from "../../../reusables/map/Map";

import './ContactUs.css'

function ContactUs () {
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

    
    
    return(
        <div className="contact_main_container">
            <h1>Contact Us!</h1>
            <p>xxx-xxx-xxxx | {cheerEmail} | 1151 Richmond St, London, ON N6A 3K7</p>
            <div className='contact_sub_container'>
                <div className="contact_left">
                    <form ref={ref} className='ContactForm' onSubmit={handleSubmit}>
                        <input type="text" placeHolder='Name' name='name' className='contact_m_input'></input>
                        <input placeholder='Email' className='contact_m_input' name='email'></input>
                        <textarea placeholder='Message Here' className='contact_s_input' rows={18} name='message'></textarea>
                        <input type="submit" className='contact_submit' value='Send' ></input>
                    </form>
                    {success==null? <div/> : success ? <p className="contact_result_text">Your message has been sent!</p>:<p className="contact_result_text">Something went wrong, please try again later</p>}  
                </div>
                <div className="contact_right" >
                    <Map location={location} zoomLevel={13} />
                </div>
            </div>
        </div>
    )
}

export default ContactUs