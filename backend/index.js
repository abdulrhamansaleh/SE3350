var express = require('express');
var cors = require('cors')
const cookieParser = require('cookie-parser');
var app = express();
const db = require('../db/db.js')
const dotenv = require('dotenv')
const saltRounds=10
// var generate_token = require('./jwt/generate_token.js')
// var generate_refresh = require('./jwt/generate_refresh.js')
// var validate_token = require('./jwt/validate_token.js')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
var validate_email = require('./validate/validate_email.js')
var validate_password = require('./validate/validate_password.js')

app.use(cors({
  credentials: true, origin: 'https://localhost:3000'
}));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/", express.static('../client/public'))
app.use(express.json()); //middleware to parse json
// app.use("/",express.static('../client/build'))

//CHEER-89
app.post('/cheer/signup', (req, res) => {
  
  let sql = 'INSERT INTO Accounts (first_name, last_name, email, password_hash, accepted) VALUES (?, ?, ?, ?, ?)'
  let values = [req.body.fname, req.body.lname, req.body.email, req.body.password, req.body.isVerified]
  db.query(sql, values, (err, result) => {
    if (err) {
      // if (err.code === 'ER_DUP_ENTRY') {
      //   //tell user that that account already exists
        
      // }
      throw err
    }

    console.log('1 record inserted into accounts')
    res.send({success: true})
  })
});

//CHEER-89
app.post('/cheer/login', (req, res) => {
  let sql = `SELECT * FROM Accounts ORDER BY account_id`

  const checkEmailPasswordMatch = (accountsList) => {
    for (let account of accountsList) {
      if (account.email === req.body.email.email && account['password_hash'] === req.body.email.password) {
        return true
      }
    }
    return false 
  }

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    } 

     // Check if any rows were returned
     if (result.length > 0) {
      if(checkEmailPasswordMatch(result)) {
        res.send({success: true})
      }
    } else {
      res.status(404).json({ error: 'No rows found' });
    }
  })
});

//CHEER-61
app.use('/childSignup', (req, res) => {
    let db //this would represent the database 

    //loop through users and see if the username entered is a "registered" user
    for (let e of db) {
        //if the username entered matches the username in the db then perform the signup 
        if (req.body.username === db.user.username) {
            
        }
    }
   
})

app.post('/subscribeNewsletter', (req, res) => {
    // Extract user information from request, typically done after authentication
    const userId = req.body.userId; // The userId should be retrieved after the user has been authenticated
  
    // Update the user's 'subscribed' status in the database
    db.query('UPDATE CHEER.users SET subscribed = 1 WHERE id = ?', [userId], (error, results) => {
      if (error) {
        res.status(500).json({ error: 'Error subscribing to newsletter' });
      } else {
        res.json({ message: 'Subscribed successfully' });
      }
    });
  });
  

dotenv.config()
//const port = process.env.port;
const port = 8080
app.listen(port, ()=>{
    console.log(`Listen on port ${port}`)
})


// API Routes
const adminRoute = require('./routes/admin.route')
app.use('/admin', adminRoute)
