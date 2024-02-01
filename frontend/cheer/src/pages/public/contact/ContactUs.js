import React from "react";

import Map from "../../../reusables/map/Map";

import './ContactUs.css'

function ContactUs () {
    const location = {
        address: '1151 Richmond St, London, ON N6A 3K7',
        map: {
            lat: 43.00973825943151,
            lng: -81.27376578080369,
        }
    
      } 
    
    
    return(
        <div className="contact_main_container">
            <h1>Contact Us!</h1>
            <div className='contact_sub_container'>
                <div className="contact_left">
                    <form className='ContactForm'>
                        <input type="text" placeHolder='Name' name='name' className='NameInput'></input>
                        <input placeholder='Email' className='EmailInput' name='email'></input>
                        <textarea placeholder='Message Here' className='Email' rows={10} name='message'></textarea>
                        <input type="submit" className='SendEmail'></input>
                    </form>
                </div>
                <div className="contact_right" >
                    <Map location={location} zoomLevel={13} />
                </div>
            </div>
        </div>
    )
}

export default ContactUs