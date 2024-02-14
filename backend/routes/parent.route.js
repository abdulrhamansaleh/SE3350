const express = require('express');
const router = express.Router();

const db = require('../../db/db');

router.post("/register-child", async(req, res) => {
    const parent = req.body.parent_id
    const first = req.body.first_name
    const last = req.body.last_name
    const email = req.body.email
    const age = req.body.age
    const isVerbal = req.body.isVerbal
    const isSpecialNeed = req.body.isSpecialNeed

    // verify request data

    // first and last name should not have any special characters or numbers
    // email should be google email
    // age should only be a number

    // create prospect child
    general_account = ""
    prospect_child = ""
    
})


module.exports = router;