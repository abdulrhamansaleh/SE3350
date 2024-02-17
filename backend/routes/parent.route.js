const express = require('express');
const router = express.Router();

const db = require('../../db/db');

router.post("/register-child", async(req, res) => {
    const parent_id  = req.body.parent 
    
    const first = req.body.first_name
    const last = req.body.last_name
    const email = req.body.email
    const age = req.body.age
    const isVerbal = parseInt(req.body.verbal)
    const isSpecialNeed = parseInt(req.body.special_needs)


    const nameRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!nameRegex.test(first) || !nameRegex.test(last)) {
       console.log('First and last name should be only letters.');
    }

    if (!emailRegex.test(email)) {
       console.log('Email should be of Gmail domain.');
    }

    if (typeof parseInt(age) !== 'number' || isNaN(age)) {
        console.log('Age should only be a number.', typeof age);
    }

    let general_user = "INSERT IGNORE INTO Accounts (first_name, last_name, email, type) VALUES (?, ?, ?, ?)";
    const general_values = [first, last, email, "child"]

    db.query(general_user, general_values, (err, result) => {
        if (err) {
            console.log("user exists")
        }
        
        const account_id = result.account_id
        
        let child_user = "INSERT IGNORE INTO Child (child_id, parent_account_id, age, special_needs, verbal) VALUES (?, ?, ?, ?, ?)"
        const child_values = [account_id, parent_id, age, isSpecialNeed, isVerbal]

        db.query(child_user, child_values, (err, result) => {
            if (err) {
                console.log("user exists")
            }
            else{
                res.send({
                    message:"created child",
                    status: 200,
                })
            }
        })
    })
})


module.exports = router;