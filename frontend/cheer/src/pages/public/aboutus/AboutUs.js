import React, { useEffect } from 'react';
import './AboutUs.css';
import teamPhoto from '../../../resources/images/olli.jpg'; // Replace with the path to your team photo
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

function AboutUs() {
  useEffect(() => {
    const speakNote = () => {
      const textContent = document.querySelector('.OLLI').innerText;
      const utterance = new SpeechSynthesisUtterance(textContent);
      window.speechSynthesis.speak(utterance);
    };
    const volumeButton = document.getElementById('volumeButton');
    if (volumeButton) {
      volumeButton.addEventListener('click', speakNote);
    }
    return () => {
      if (volumeButton) {
        volumeButton.removeEventListener('click', speakNote);
      }
    };
  }, []);

  return (
    <div className='aboutus_main_container'>
      <div className='aboutus_content_container'>
        <div className='aboutus_text_section'>
          <div className='aboutus_text_container'>
            <h1 className='aboutus_main_header'>OLLI</h1>
            <button id="volumeButton" title="Read aloud">
              <FontAwesomeIcon icon={faVolumeHigh} className="volume-icon" />
            </button>
              <div className="OLLI">
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
