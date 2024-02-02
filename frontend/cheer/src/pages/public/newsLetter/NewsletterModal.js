// NewsletterModal.js
import React from 'react';
import Modal from 'NewsletterModal.js'; 

const NewsletterModal = ({ isOpen, onClose, onSubscribe }) => {
  if (!isOpen) return null;

  return (
    <Modal>
      <h2>Subscribe to our Newsletter</h2>
      <p>Stay updated with the latest news!</p>
      <button onClick={onSubscribe}>Subscribe</button>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default NewsletterModal;
