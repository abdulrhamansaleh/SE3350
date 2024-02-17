const express = require('express');
const router = express.Router();
const db = require('../../db/db.js');

router.post('/subscribe', async (req, res) => {
  const { accountId, email } = req.body;
  try {
      const db = await db();
      const [rows, fields] = await db.query('UPDATE accounts SET subscribed = TRUE, email = ? WHERE account_id = ?', [email, accountId]);
      res.status(200).send('Subscription updated successfully');
  } catch (error) {
      console.error(error);
      res.status(500).send('Error updating subscription',error.message);
  }
});
module.exports = router;