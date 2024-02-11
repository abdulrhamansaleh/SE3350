const express = require('express')
const router = express.Router()
const db = require('../../db/db')

// mailing imports
const multer = require('multer')
const mailer = require('nodemailer')

/*
   CONFIGURATION FOR GMAIL(outgoing)

   max receipents: 100 

    smtp.gmail.com
    require ssl: yes
    require tls: yes (if available)
    requires authentication: yes
    port for SSL: 465
    port for TLS/STARTTLS: 587
*/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({storage: storage})

router.post('/send-newsletter', upload.single('pdf') , async (request, response) => {
    const SENDER =  process.env.ADMIN_EMAIL || 'pureexec@gmail.com'
    const SUBJECT = 'CHEER Newsletter'
    const PDF_FILE = request.file.path
    const GMAIL_AUTH_APP = 'soenjbdhrzknbvcm'

    const email_config = mailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465, 
        secure: true,
        auth: {
            user: process.env.ADMIN_EMAIL || 'pureexec@gmail.com', // remove when deploying
            pass: GMAIL_AUTH_APP
        }
    })
    
    try{
        let stmt = "SELECT email FROM CHEER.Accounts WHERE subscribed = 1;"
        db.query(stmt, function(error, result){
            if (error) {
                console.log("[DB ERROR] an error occured when fetching subsribed users", error)
            } 
           
            const subscriber_emails = result.map(subscriber => subscriber.email)

            console.log(subscriber_emails.join(','))
            email_config.sendMail({
                from: SENDER,
                to: subscriber_emails.join(','),
                subject: SUBJECT,
                attachments: [
                    {
                        filename: request.file.originalname, 
                        path: PDF_FILE 
                    }
                ]
            })
        })
    }
    catch(err){
        if (err) response.status(500).json({message: err})
    }
})

module.exports = router 