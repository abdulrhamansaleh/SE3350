import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './Home.css';

import AboutUs from '../aboutus/AboutUs.js';
import NewsletterModal from '../newsLetter/NewsletterModal.js';
import CheerGroup from './CheerGroup.js';
import CheerConnections from './CheerConnections.js';
import CheerWorks from './CheerWorks.js';

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState([]); // Adjusted for fetching reviews
  const [newReview, setNewReview] = useState({ author: '', content: '' });

  useEffect(() => {
    // Function to fetch published reviews
    const fetchPublishedReviews = async () => {
      try {
        const { data } = await axios.get('/api/reviews');
        // Assuming that your backend filters or you need to filter published reviews on the frontend
        setReviews(data.filter(review => review.isPublished)); // If needed, adjust based on your data structure
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchPublishedReviews();

    const timer = setTimeout(() => setShowModal(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setShowModal(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const submitReview = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/reviews', newReview);
      alert('Review submitted successfully!');
      setNewReview({ author: '', content: '' }); // Reset form for the next submission
      // Optionally, re-fetch reviews to update the list with the newly submitted review
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review.');
    }
  };

  return (
    <div className='home-background'>
      {showModal && <NewsletterModal onClose={handleClose} />}
      <div className='home-main-container'>
        <div className='overlay'></div>
        <div className='landing-section'>
          <h1 className='landing-title'>C.H.E.E.R.</h1>
          <p className='landing-subtitle'>Empowering Lives, Building Community</p>
          <NavLink className="main-entry-button" to="/cheer/signup">Sign Up!</NavLink>
        </div>
      </div>
      <AboutUs />
      <div className="cheer-section-container">
        <CheerGroup />
        <CheerConnections />
        <CheerWorks />
      </div>
      {/* Display published reviews */}
      <div className="reviews-display-section">
        <h2>Customer Reviews</h2>
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <blockquote>
                "{review.content}"
                <footer>— {review.author || 'Anonymous'}</footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
      {/* Review submission form */}
      <div className="review-form-container">
        <h2>Write a Review</h2>
        <form onSubmit={submitReview}>
          <input
            type="text"
            name="author"
            placeholder="Your Name"
            value={newReview.author}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="content"
            placeholder="Your Review"
            value={newReview.content}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
}

export default Home;

