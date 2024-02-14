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
    let match = {match: false, account: {}}
    for (let account of accountsList) {
      if (account.email === req.body.email.email && account['password_hash'] === req.body.email.password) {
        match.match = true
        match.account = account
        return match
      }
    }
    return match 
  }

  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    } 
    let accountData = checkEmailPasswordMatch(result)
     // Check if any rows were returned
     if (result.length > 0) {
      if(accountData.match) {
        res.send({success: true, account: accountData.account})
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

//CHEER-72
app.get('/admin/get/all/users',(req,res)=>{
  db.query('SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts', (error, results)=>{
    if(error){
      res.status(500).json({error:'Error occurred while getting rows'})
    }else{
      return res.json(results)
    }
  })
})
app.get('/admin/get/verified/users',(req,res)=>{
  db.query('SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts WHERE accepted=1', (error, results)=>{
    if(error){
      res.status(500).json({error:'Error occurred while getting rows'})
    }else{
      return res.json(results)
    }
  })
})
app.get('/admin/get/un-verified/users',(req,res)=>{
  db.query('SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts WHERE accepted=0', (error, results)=>{
    if(error){
      res.status(500).json({error:'Error occurred while getting rows'})
    }else{
      return res.json(results)
    }
  })
})
app.get('/admin/get/subscribed/users',(req,res)=>{
  db.query('SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts WHERE subscribed=1', (error, results)=>{
    if(error){
      res.status(500).json({error:'Error occurred while getting rows'})
    }else{
      return res.json(results)
    }
  })
})
app.get('/admin/get/requested-change/users',(req,res)=>{
  db.query('SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts WHERE requested_change=1', (error, results)=>{
    if(error){
      res.status(500).json({error:'Error occurred while getting rows'})
    }else{
      return res.json(results)
    }
  })
})
app.get('/admin/get/users/users',(req,res)=>{
  db.query('SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts WHERE type=?',["child"], (error, results)=>{
    if(error){
      res.status(500).json({error:'Error occurred while getting rows'})
    }else{
      return res.json(results)
    }
  })
})
app.get('/admin/get/parents/users',(req,res)=>{
  db.query('SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts WHERE type=?',["parent"], (error, results)=>{
    if(error){
      console.log(error)
      res.status(500).json({error:'Error occurred while getting rows'})
    }else{
      return res.json(results)
    }
  })
})
app.get('/admin/get/employees/users',(req,res)=>{
  db.query('SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts WHERE type=?',["employee"], (error, results)=>{
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

// admin functionalities
const adminRoute = require('./routes/admin.route')
app.use('/admin', adminRoute)

// parent functionalities
const parentRoutes = require('./routes/parent.route')
app.use('/parent', parentRoutes)

// child functionalities
const childRoutes = require('./routes/child.route')
app.use('/child', childRoutes)