const express = require('express');
const router = express.Router();

const db = require('../../db/db');

router.post("/register-child", async(req, res) => {
    const user_token  = req.body.parent 
    
    const first = req.body.first_name
    const last = req.body.last_name
    const email = req.body.email
    const age = req.body.age
    const isVerbal = req.body.isVerbal
    const isSpecialNeed = req.body.isSpecialNeed

    /*
        Validate Request Body 
            - first and last name should be only string (no special chars or numbers)
            - email should be of gmail domains 
            - age should only be a number
    */

    /*
        Creating Child Account 
            - create a general account 
                (account_id, first_name, last_name, email, type) # rest is default 

            - create a prospect child account 
                (account_id, parent_id(user_session.account_id), age, special_needs?, verbal?)
    */
})


module.exports = router;