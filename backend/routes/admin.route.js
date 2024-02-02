const express = require('express');
const router = express.Router();

const multer = require('multer'); // middle ware for file upload
const upload = multer = ({dest: 'uploads/'})

router.post('/send-newsletter', upload.single('file'), async (request, response) => {
    try{
        // get all subscribed users
        // use mailing service to send users uploaded file
    }
    catch(err){
    }
})
