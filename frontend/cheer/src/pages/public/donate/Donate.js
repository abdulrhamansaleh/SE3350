import React from 'react';
import './Donate.css'; // Updated import path
import donateimg from '../../../resources/images/donate.jpg';
const Donate = () => {
  return (
    <div className="react-donate-container">
      <header className="react-donate-header">
        <h1>Support Our Cause</h1>
      </header>
      <main className="react-donate-main">
        <p className="react-donate-description">Your donation helps us make a difference. Together, we can achieve more.</p>
        <p className="react-donate-link-description">We take donations through <a href="https://www.canadahelps.org/en/pages/olli-cheer/" target="_blank" rel="noopener noreferrer" className="react-donate-link">Canada Helps</a>, a trusted donation site for charities in Canada.</p>
        <button className="react-donate-button" onClick={() => window.open('https://www.canadahelps.org/en/pages/olli-cheer/', '_blank')}>
          Donate Now
        </button>
        <p>Thank you for your support!</p>
    
      </main>
      <img src={donateimg} alt="donateimg" className='donate-image'/>
    </div>
  );
};

export default Donate;
