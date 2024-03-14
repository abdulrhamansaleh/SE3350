import React from 'react';
import './AboutUs.css';
import teamPhoto from '../../../resources/images/olli.jpg'; // Replace with the path to your team photo
import TextToSpeech from '../../../reusables/textToSpeech/TextToSpeech';

function AboutUs() {
  return (
    <div className='aboutus_main_container'>
      <div className='aboutus_content_container'>
        <div className='aboutus_text_section'>
          <div className='aboutus_text_container'>
            <h1 className='aboutus_main_header'>OLLI</h1>
              <TextToSpeech selectedClassName="aboutUs" />
              <div className="aboutUs">
                <p className='aboutus_mission'>
                  OLLI is a registered not-for-profit 
                  caregiver-driven company with 
                  four areas of focus: Cheer Group, 
                  Cheer Works, Cheer Connections, 
                  and Cheer Living.
                </p>
                <p className='aboutus_vision'>
                  Vision Statement—
                  To be a community of inclusion and 
                  a circle of friendship that supports 
                  and enhances the lives of our loved 
                  ones with intellectual disabilities as 
                  well as the whole family
                </p>
              </div>
          </div>
        </div>
        <img className='aboutus_main_img' src={teamPhoto} alt='Zendesk Team' />
      </div>
    </div>
  );
}

export default AboutUs;
