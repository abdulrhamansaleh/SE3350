// NewsletterModal.js
import React, { useState } from 'react';
import './NewsletterModal.css';

const NewsletterModal = ({ onClose }) => {
    const [email, setEmail] = useState(''); // To handle email input state

    const handleSubscribe = async () => {
        if (email) {
            // Add subscription logic 
            onClose();
        } else {
            alert('Please enter an email address');

        }
    };

    return (
        <div className="modal">
            <div className="popup">
                <div className="form">
                    <div className="note">
                        <h2 className="title">Subscribe to Our Newsletter</h2>
                        <p className="subtitle">Stay updated with the latest news</p>
                    </div>
                    <input
                        className="input_field"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="submit" onClick={handleSubscribe}>Subscribe</button>
                </div>
            </div>
            <span className="close" onClick={onClose}>&times;</span>
        </div>
    );
};

export default NewsletterModal;
