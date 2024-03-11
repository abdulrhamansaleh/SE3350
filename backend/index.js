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
app.get('/admin/get/users',(req,res)=>{
  var queryString=""
  const count = req.query.length
  const offset = req.query.offset
  const type = req.query.type
  switch(type){
    case "Everyone":
      queryString='SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts LIMIT ? OFFSET ?'
      break;
    case "Verified":
      queryString='SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts WHERE accepted=1 LIMIT ? OFFSET ?'
      break;
    case "Un-Verified":
      queryString='SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts WHERE accepted=0 LIMIT ? OFFSET ?'
      break;
    case "Subscribed":
      queryString = 'SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts WHERE subscribed=1 LIMIT ? OFFSET ?'
      break;
    case "Requested-Change":
      queryString='SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts WHERE requested_change=1 LIMIT ? OFFSET ?'
      break;
    case "Users":
      queryString='SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts WHERE type="child" LIMIT ? OFFSET ?'
      break;
    case "Parents":
      queryString='SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts WHERE type="parent" LIMIT ? OFFSET ?'
      break;
    case "Employees":
      queryString='SELECT account_id, first_name, last_name, type, email, accepted FROM Accounts WHERE type="employee" LIMIT ? OFFSET ?'
      break;
  }
  db.query(queryString, [parseInt(count), parseInt(count*offset)], (error,result)=>{
    if(error){
      console.log(error)
      res.status(500).json({error:'Error getting rows'})
    }else{
      res.json(result)
    }
  })
})

// CHEER-86
app.post('/verify', async (request, response) => {
  const { captchaValue } = request.body
  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${captchaValue}`,
  )
  response.send(data)
})

app.get('/admin/get/users/length',(req,res)=>{
  var queryString=""
  const type = req.query.type
  switch(type){
    case "Everyone":
      queryString='SELECT COUNT(*) AS max FROM Accounts'
      break;
    case "Verified":
      queryString='SELECT COUNT(*) AS max FROM Accounts WHERE accepted=1'
      break;
    case "Un-Verified":
      queryString='SELECT COUNT(*) AS max FROM Accounts WHERE accepted=0'
      break;
    case "Subscribed":
      queryString = 'SELECT COUNT(*) AS max FROM Accounts WHERE subscribed=1'
      break;
    case "Requested-Change":
      queryString='SELECT COUNT(*) AS max FROM Accounts WHERE requested_change=1'
      break;
    case "Users":
      queryString='SELECT COUNT(*) AS max FROM Accounts WHERE type="child"'
      break;
    case "Parents":
      queryString='SELECT COUNT(*) AS max FROM Accounts WHERE type="parent"'
      break;
    case "Employees":
      queryString='SELECT COUNT(*) AS max FROM Accounts WHERE type="employee"'
      break;
  }
  db.query(queryString, (error,result)=>{
    if(error){
      console.log(error)
      res.status(500).json({error:'Error getting max rows'})
    }else{
      res.json(result)
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


app.get('/user-permission', (req, res) => {
  var user = "SELECT * FROM Account WHERE account_id = ?";
  var accountId = req.query.account; // Assuming the query parameter name is 'account'

  // Execute the query with the account_id
  db.query(user, [accountId], (error, results) => {
    if (error) {
      // Handle the error, possibly sending a server error response
      console.error('Error executing query:', error);
      res.status(500).send('Internal Server Error');
    } else {
      // Send the query results back to the client
      res.json(results);
    }
  });
});

// admin functionalities
const adminRoute = require('./routes/admin.route')
app.use('/admin', adminRoute)

const newsletterModalRoute = require('./routes/newslettermodal.route')
app.use('/api', newsletterModalRoute)

// parent functionalities
const parentRoutes = require('./routes/parent.route')
app.use('/parent', parentRoutes)

// child functionalities
const childRoutes = require('./routes/child.route')
app.use('/child', childRoutes)