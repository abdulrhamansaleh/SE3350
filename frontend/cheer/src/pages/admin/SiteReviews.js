import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/SiteReviews.css';

const SiteReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false); // New state for publish success feedback

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/reviews');
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const deleteReview = async (id) => {
    try {
      console.log('Deleting review with ID:', id); // Log the ID for debugging
      await axios.delete(`/api/reviews/${id}`);

      alert(`Review with ID: ${id} deleted successfully!`);
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };
  

  const publishReview = async (id) => {
    setPublishing(true); // Set publishing state to true
    setPublishSuccess(false); // Reset publishSuccess state
  
    try {
      await axios.put(`/api/reviews/publish/${id}`);
      fetchReviews();
      setPublishSuccess(true); // Set publishSuccess state based on successful response
    } catch (error) {
      console.error('Error publishing review:', error);
      // Handle publish failure if needed
    } finally {
      setPublishing(false); // Set publishing state back to false
    }
  };
  return (
    <div className="reviews-container">
      <h2>Reviews Management</h2>
      {publishing && <p>Publishing review...</p>}
      {publishSuccess && <p>Review published successfully!</p>}
      <ul>
        {reviews.map(review => (
          <li key={review.id} className="review-item">
            <p><strong>{review.author || 'Anonymous'}:</strong> {review.content}</p>
            <div className="actions">
              {review.isPublished ? (
                <span>Published</span>
              ) : (
                <button onClick={() => publishReview(review.id)}>Publish</button> // Fixed issue here by passing the id
              )}
              <button onClick={() => deleteReview(review.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiteReviews;
