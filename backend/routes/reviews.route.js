const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

router.use(express.json()); // Middleware to parse JSON bodies

const reviewsFilePath = path.join(__dirname, 'reviews.json'); // Path to the reviews JSON file

// Endpoint to get all reviews
router.get('/reviews', (req, res) => {
  fs.readFile(reviewsFilePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading reviews data.');
      return;
    }
    res.send(JSON.parse(data));
  });
  console.log("Fetching reviews")
});


// Endpoint to delete a review by index
router.delete('/reviews/:id', (req, res) => {
  const index = req.params.index;

  fs.readFile(reviewsFilePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading reviews data.');
      return;
    }
    let reviews = JSON.parse(data);
    if (index >= reviews.length) {
      res.status(404).send('Review not found.');
      return;
    }
    reviews.splice(index, 1); // Remove review at specified index

    fs.writeFile(reviewsFilePath, JSON.stringify(reviews, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error deleting review.');
        return;
      }
      res.send({ message: 'Review deleted successfully.' });
    });
  });
});

router.post('/reviews', (req, res) => {
  fs.readFile(reviewsFilePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading reviews data.');
      return;
    }
    const reviews = JSON.parse(data);
    const lastReviewId = reviews.length > 0 ? Math.max(...reviews.map(review => review.id)) : 0;
    const newReviewId = lastReviewId + 1;
    const newReview = { id: newReviewId, ...req.body, isPublished: false };
    reviews.push(newReview);

    fs.writeFile(reviewsFilePath, JSON.stringify(reviews, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error saving new review.');
        return;
      }
      res.send(newReview);
    });
  });
});
// Endpoint to publish a review by ID
router.put('/reviews/publish/:id', (req, res) => {
  const id = Number(req.params.id); // Convert req.params.id to a number

  fs.readFile(reviewsFilePath, (err, data) => {
    if (err) {
      res.status(500).send('Error reading reviews data.');
      return;
    }
    let reviews = JSON.parse(data);
    const reviewIndex = reviews.findIndex(review => review.id === id);
    if (reviewIndex === -1) {
      res.status(404).send('Review not found.');
      return;
    }
    const updatedReview = reviews[reviewIndex];
    updatedReview.isPublished = true; // Mark the review as published

    fs.writeFile(reviewsFilePath, JSON.stringify(reviews, null, 2), (err) => {
      if (err) {
        res.status(500).send('Error publishing review.');
        return;
      }
      res.send({ message: 'Review published successfully.', review: updatedReview });
    });
  });
});

// // Endpoint to publish a review by ID
// router.put('/reviews/publish/:id', (req, res) => {
//   const id = req.params.id;

//   // Check if the provided id is valid
//   if (!id || typeof id !== 'string') {
//     res.status(400).send('Invalid review ID provided.');
//     return;
//   }

//   fs.readFile(reviewsFilePath, (err, data) => {
//     if (err) {
//       console.error('Error reading reviews data:', err);
//       res.status(500).send('Error reading reviews data.');
//       return;
//     }
//     let reviews = JSON.parse(data);
//     const reviewIndex = reviews.findIndex(review => review.id === id);
//     if (reviewIndex === -1) {
//       res.status(404).send('Review not found.');
//       return;
//     }
//     reviews[reviewIndex].isPublished = true;

//     fs.writeFile(reviewsFilePath, JSON.stringify(reviews, null, 2), (err) => {
//       if (err) {
//         console.error('Error publishing review:', err);
//         res.status(500).send('Error publishing review.');
//         return;
//       }
//       // Send the updated review data in the response
//       res.send({ message: 'Review published successfully.', review: reviews[reviewIndex] });
//     });
//   });
// });


  

module.exports=router;