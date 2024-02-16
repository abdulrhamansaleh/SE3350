const express = require('express');
const router = express.Router();

const db = require('../../db/db');

router.post("/authenticate", async(req, res) => {
    res.send(req.body.email)
})

module.exports = router;