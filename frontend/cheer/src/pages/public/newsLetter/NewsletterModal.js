import React, { useState } from 'react';

const NewsletterModal = ({ isOpen, onClose, onSubscribe }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>subscribe to our newsletter!</p>
        <button onClick={onSubscribe}>Subscribe</button>
      </div>
    </div>
  );
};

export default NewsletterModal;
