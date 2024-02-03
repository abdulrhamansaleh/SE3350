const express = require('express');
const router = express.Router();

router.post('/send-newsletter', async (request, response) => {
    try{
        // get all subscribed users
        // use mailing service to send users uploaded file
    }
    catch(err){
    }
})

module.exports = router;