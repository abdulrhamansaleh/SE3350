const express = require('express');
const router = express.Router();

const db = require('../../db/db');

router.post("/authenticate", async(req, res) => {
    const stmt = "SELECT account_id FROM CHEER.Accounts WHERE email = ?"
    let email = req.body.email

    db.query(stmt, email, (err, result) => {
        if (err) throw err;

        if (result.length == 1){
            res.send({
                status: 200,
                message : `${email} has logged in`,
                id: result[0].account_id,
            })
        }
        else{
            res.send({
                status: 404,
                message : `${email} is not registered`
            })
        }
    })

})

module.exports = router;