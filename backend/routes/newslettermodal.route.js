const express = require('express');
const router = express.Router();
const db = require('../../db/db.js');

router.post('/subscribe', async (req, res) => {
  const { accountId, email } = req.body;
  console.log(email)
  try {
      db.query('UPDATE Accounts SET subscribed = TRUE, email = ? WHERE account_id = ?', [email, accountId], (err, result) => {
        if (err) throw err;
        console.log(result)
        res.status(200).send('Subscription updated successfully');
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error updating subscription',error.message);
  }
});
module.exports = router;