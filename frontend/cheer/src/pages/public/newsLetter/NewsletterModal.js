import React, { useState, useEffect, useRef } from 'react';
import { IoClose, IoMail } from 'react-icons/io5';
import './NewsletterModal.css';

const NewsletterModal = ({ onClose }) => {
    
    var account = ""
    if (sessionStorage.getItem('token')) {
        account = JSON.parse(sessionStorage.getItem('token')).account_id
    }
    const [email, setEmail] = useState('');
    const modalRef = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef, onClose]);

    const handleSubscribe = async () => {
        if (email) {
            try {
                const isValidEmail = (email) => {
                    return /\S+@\S+\.\S+/.test(email);
                };
                
                if (!isValidEmail(email)) {
                    alert('Please enter a valid email address');
                    return;
                }                
                const response = await fetch('/api/subscribe', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ accountId: account , email: email}),
                });
                if (response.ok) {
                    // Handle successful subscription
                    onClose();
                } else {
                    const errorText = await response.text();
                    alert(`Error subscribing: ${errorText}`);
                }
            } catch (error) {
                console.error(error);
                alert('Error subscribing');
            }
        } else {
            alert('Please enter an email address');
        }
    };    

    return (
        <div className="newsletter-modal">
            <div className="newsletter-popup" ref={modalRef}>
                <button className="newsletter-close" onClick={onClose} aria-label="Close">
                    <IoClose size={24} />
                </button>

                <div className="newsletter-form">
                    <div className="newsletter-note">
                        <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
                        <p className="newsletter-subtitle">Stay updated with the latest news</p>
                    </div>
                    <div className="newsletter-input-wrapper">
                        <IoMail className="newsletter-input-icon" size={20} />
                        <input
                            className="newsletter-input_field"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button className="newsletter-submit" onClick={handleSubscribe}>
                        <IoMail className="newsletter-submit-icon" size={20} />
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewsletterModal;