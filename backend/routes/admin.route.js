const express = require('express');
const router = express.Router();
const db = require('../../db/db');
const multer = require('multer');
const mailer = require('nodemailer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/send-newsletter', upload.single('pdf'), async (request, response) => {
    const SUBJECT = 'CHEER Newsletter';

    const email_config = mailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.GMAIL_AUTH_APP
        }
    });

    try {
        
        let stmt = "SELECT email FROM CHEER.Accounts WHERE subscribed = 1;";
        const [result] = await db.promise().query(stmt);
        const subscriber_emails = result.map(subscriber => subscriber.email);

        await email_config.sendMail({
            from: process.env.ADMIN_EMAIL,
            to: subscriber_emails.join(','),
            subject: SUBJECT,
            attachments: [{
                filename: request.file.originalname,
                path: request.file.path
            }]
        });

        response.send({ message: "Delivered newsletters" });
    } catch (err) {
        console.error(err);
        response.status(500).json({ message: "An Error Occured" });
    }
});

module.exports = router;
