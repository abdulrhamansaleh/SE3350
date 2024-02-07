import React, { useState, useEffect, useRef } from 'react';
import { IoClose, IoMail } from 'react-icons/io5';
import './NewsletterModal.css';

const NewsletterModal = ({ onClose }) => {
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
            // Add subscription logic 
            onClose();
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
