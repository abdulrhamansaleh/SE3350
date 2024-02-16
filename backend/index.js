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

const fs = require("fs");
var jsonDB = require('./jsonDB.json') 

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/", express.static('../client/public'))
// app.use("/",express.static('../client/build'))

const getUsersFromJsonDb = () => {
    fs.readFile("jsonDB.json", (error, data) => {
        if (error) {
            console.error(error);
            throw error;
        }
        const info = JSON.parse(data)
        return info.users
    })
}

//CHEER-60
app.use('/signup', (req, res) => {
    // signup logic goes here

    res.send({
        email: req.body.username,
        password: req.body.password,
        reason: req.body.reason,
        isVerified: false
      });
});

//CHEER-57
app.use('/login', (req, res) => {
    //this is where the logic for password and username checking will happen
    //for now, we will just store the unhashed credentials for testing purposes
    //if (validate_email(req.username) && validate_password(req.password))
    // let usersList = getUsersFromJsonDb()
    // for (user of usersList) {
    //     if (user.username === req.username && user.password === req.password) {
    //         res.send({
    //             token: 'true'
    //         })
    //         break 
    //     }
    // }

    
    //get the username and password from the user trying to login and see if it matches the db
    res.send({
      token: true,//the value of this token will determine if the user is logged in 
      parent: true, //use this flag after signup to see if the user is a parent 
      username: req.body.username,
      password: req.body.password,
    });
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

//CHEER-72
app.get('/admin/get/users',(req,res)=>{
  db.query('SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts', (error, results)=>{
    if(error){
      res.status(500).json({error:'Error occurred while getting rows'})
    }else{
      return res.json(results)
    }
  })
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
