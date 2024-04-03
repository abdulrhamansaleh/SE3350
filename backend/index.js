var express = require('express');
var cors = require('cors')
const cookieParser = require('cookie-parser');
var app = express();
const db = require('../db/db.js')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const saltRounds=10
// var generate_token = require('./jwt/generate_token.js')
// var generate_refresh = require('./jwt/generate_refresh.js')
// var validate_token = require('./jwt/validate_token.js')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
var validate_email = require('./validate/validate_email.js')
var validate_password = require('./validate/validate_password.js')
var clean_phone_number = require('./validate/clean_number')

const fileUpload = require("express-fileupload")
const path = require("path");

const fileSizeLimiter = require('./uploads/middleware/fileSizeLimiter.js')
const filesPayloadExists = require('./uploads/middleware/filesPayloadExists.js')

app.use(cors({
  credentials: true, origin: 'https://localhost:3000'
}));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/", express.static('../client/public'))
app.use(express.json()); //middleware to parse json
// app.use("/",express.static('../client/build'))

app.post('/cheer/signup',(req,res)=>{
  const {fname,lname,email,phone,password, cpassword, reason} = req.body
  if(!validate_email(email)){
    return res.status(401).send({"msg":"Please use a valid email"})
  }
  if(password === cpassword){
    if(!validate_password(cpassword)){
      return res.status(401).send({"msg":"Password must be 6-16 character long and must contain at least one number and special character"})
    }
    bcrypt.genSalt(saltRounds, function(err, salt){
      if(err) {console.log(err); return res.status(500).send({"msg": "Error has occured"}) }
      bcrypt.hash(password, salt, function(err,hash){
        var q = "INSERT INTO CHEER.Accounts(`type`, first_name, last_name, email, password_hash, subscribed, accepted, requested_change)VALUES('parent',?,?,?,?,0,0,0);"
        db.query(q, [fname,lname,email,hash], (err,result)=>{
          if(err){  
            console.log(err)
            if(err.code === 'ER_DUP_ENTRY'){
              return res.status(500).send({"msg":"Email already in use"})
            }
            return res.status(500).send({"msg":"An error has occured"})
          }
          var q2 ="INSERT INTO CHEER.ParentDetails(account_id, parent_number)VALUES(?, ?)";
          db.query(q2, [result.insertId, clean_phone_number(phone)], (err)=>{
            if(err){console.log(err);return res.status(500).send({"msg":"An error has occured"})}
            //JWT and cookie stuff here
            return res.status(200).send({"msg":"Success"})
          })
        })
      })
    })
  }else{
    return res.status(401).send({"msg": "Passwords must match"})
  }
})

app.post('/cheer/login', (req,res)=>{
  const {email, password} = req.body
  console.log(email)

  // let test = "SELECT * FROM Accounts"

  // db.query(test, [], (err, result) => {
  //   console.log(result)
  // })

  //password_hash

  var q ="SELECT email, password_hash, account_id, type FROM Accounts WHERE email = ?"
  db.query(q, [email],(err,result)=>{
    if(result==null){
      return res.status(404).send({"msg":"Email not registered "})
    }else{
      bcrypt.compare(password, result[0].password_hash, function(err,hashresult){
        if(err){console.log(err); return res.status(500).send({"msg":"Error has occured"})}
        if(hashresult){
          console.log(result[0])
          return res.send({success: true, account_id: result[0]['account_id'], type: result[0]['type']})
          //cookie and JWT stuff here
        }else{
          return res.status(401).send({"msg":"Password does not match"})
        }
      })
    }
  })
  
})

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

app.get('/admin/get/events/length',(req,res)=>{
  var queryString=""
  const start_date = req.query.start_date
  const end_date = req.query.end_date
  
  const type = req.query.type
  switch(type){
    case "all":
      queryString = "SELECT COUNT(*) AS max FROM Events"
      db.query(queryString, (err,result)=>{
        if(err){
          console.log(err)
          return res.status(500).send({"msg":"Error has occurred"})
        }
        return res.json(result)
      })
      break;
    case "future":
      queryString = "SELECT COUNT(*) AS max FROM Events WHERE start_time > CURRENT_DATE()"
      db.query(queryString, (err,result)=>{
        if(err){
          console.log(err)
          return res.status(500).send({"msg":"Error has occurred"})
        }
        return res.json(result)
      })
      break;
    case "past":
      queryString = "SELECT COUNT(*) AS max FROM Events WHERE start_time < CURRENT_DATE()"
      db.query(queryString, (err,result)=>{
        if(err){
          console.log(err)
          return res.status(500).send({"msg":"Error has occurred"})
        }
        return res.json(result)
      })
      break;
    case "custom":
      queryString = "SELECT COUNT(*) as max FROM Events WHERE start_time>= ? AND end_time <= ?"
      db.query(queryString,[start_date, end_date],(err,result)=>{
        if(err){
          console.log(err)
          return res.status(500).send({"msg":"Error has occurred"})
        }
        return res.json(result)
      })
      break;
    default:
      queryString = "SELECT COUNT(*) FROM Events"
      break;
  }
})


app.get('/admin/get/events',(req,res)=>{
  var queryString=""
  const start_date = req.query.start_date
  const end_date = req.query.end_date
  const count = req.query.length
  const offset = req.query.offset

  const type = req.query.type
  switch(type){
    case "all":
      queryString = "SELECT * FROM Events LIMIT ? OFFSET ?"
      db.query(queryString, [parseInt(count), parseInt(count*offset)],(err,result)=>{
        if(err){
          console.log(err)
          return res.status(500).send({"msg":"Error has occurred"})
        }
        return res.json(result)
      })
      break;
    case "future":
      queryString = "SELECT * FROM Events WHERE start_time > CURRENT_DATE() LIMIT ? OFFSET ?"
      db.query(queryString, [parseInt(count), parseInt(count*offset)],(err,result)=>{
        if(err){
          console.log(err)
          return res.status(500).send({"msg":"Error has occurred"})
        }
        return res.json(result)
      })
      break;
    case "past":
      queryString = "SELECT * FROM Events WHERE start_time < CURRENT_DATE() LIMIT ? OFFSET ?"
      db.query(queryString,  [parseInt(count), parseInt(count*offset)],(err,result)=>{
        if(err){
          console.log(err)
          return res.status(500).send({"msg":"Error has occurred"})
        }
        return res.json(result)
      })
      break;
    case "custom":
      queryString = "SELECT * FROM Events WHERE start_time>= ? AND end_time <= ? LIMIT ? OFFSET ?"
      db.query(queryString,[start_date, end_date, parseInt(count), parseInt(count*offset)],(err,result)=>{
        if(err){
          console.log(err)
          return res.status(500).send({"msg":"Error has occurred"})
        }
        return res.json(result)
      })
      break;
  }
 
})


app.post('/admin/edit/event/:id', fileUpload({createParentPath: true}), (req,res)=>{
  const {event_id, title, description, start_time, end_time, transport_details} = req.body

  // console.log(req.body)
  // console.log(req.files)
  const files = req.files
  queryString='UPDATE CHEER.Events  SET title=?, description=?, start_time=?, end_time=?, transport_details=? WHERE event_id=?;'
  db.query(queryString,[title,description, start_time, end_time, transport_details, event_id], (error, result)=>{
    if(error){
      console.log(err)
      res.status(500).send({"msg":"Error has occured"})
    }
  })

  Object.keys(files).forEach(key=>{
    const filepath = path.join(__dirname,'uploads/waivers',files[key].name)
    files[key].mv(filepath, (err)=>{
      if (err) return res.status(500).json({ status: "error", message: err })
    })

  })

  return res.status(200).send({"msg":"Updated"})
})

app.get('/admin/get/waivers',(req,res)=>{
  const event_id = req.query.event_id
  queryString ='SELECT waiver_id, name FROM EventWaivers WHERE event_id=?'
  db.query(queryString, [event_id], (err,result)=>{
    if(err){
      console.log(err)
      res.status(500).send({"msg":"Error has occured"})
    }else{
      return res.json(result)
    }
  })
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
const childRoutes = require('./routes/child.route');
app.use('/child', childRoutes)

// // event & calendar
const eventRoutes = require('./routes/manageevent.route.js')
app.use('/calendar', eventRoutes)



///////// CHEER-90 request accoung changes START  ///////////

//using rac to abbreviate request account changes in the uri 


app.post('/rac', (req, res) => {
  const {requestedChange, accountId} = req.body

  let sql = "UPDATE CHEER.Accounts SET requested_change = ? WHERE account_id = ?"

  db.query(sql, [requestedChange, accountId], (error, result) => {
    if (error) {
      res.status(500).json({ error: error });
    } else {
      res.send({success: true})
    }
  });

})

app.post('/findRAC', (req, res) => {
  const {accountId} = req.body

  var sql ="SELECT account_id FROM Accounts WHERE account_id = ?"

  db.query(sql, [accountId], (err, result) => {
    if(err || !result[0]?.['account_id']){  
      console.log(err)
      return res.status(500).send({"msg":"An error has occured"})
    } else {
      res.send({success: true, data: result[0]['timesheet_id'], RAC: result[0]['requested_change']})
    }
  })
  
})


///////// CHEER-90 request accoung changes START  ///////////


///////// employee clock in clock out START ///////////

app.post('/findTimeSheetId', (req, res) => {

  var sql ="SELECT timesheet_id FROM TimeSheet WHERE clock_in_time = clock_out_time"

  db.query(sql, (err, result) => {
    if(err || !result[0]?.['timesheet_id']){  
      console.log(err)
      return res.status(500).send({"msg":"An error has occured"})
    } else {
      res.send({success: true, data: result[0]['timesheet_id']})
    }
  })
  
})

app.post('/clockOut', (req, res) => {
  const {clockOut, timeSheetId} = req.body

  let sql = "UPDATE CHEER.TimeSheet SET clock_out_time = ? WHERE timesheet_id = ?"

  db.query(sql, [clockOut, timeSheetId], (error, result) => {
    if (error) {
      res.status(500).json({ error: error });
    } else {
      res.send({success: true})
    }
  });


})

app.post('/clockIn', (req, res) => {

  const {accountId, clockIn, clockOut} = req.body

  //req has to send account_id and the clock in time 

  const sql = "INSERT INTO CHEER.TimeSheet(account_id, clock_in_time, clock_out_time)VALUES(?,?,?);"

  db.query(sql, [accountId,clockIn,clockOut], (err,result)=>{
    if(err){  
      console.log(err)
      return res.status(500).send({"msg":"An error has occured"})
    } else {
      res.send({success: true})
    }
  })

  const q = "SELECT * FROM TimeSheet"

  db.query(q, (err, result) => {
    console.log(result)
  })


})


//for testing
app.post('/resetTimeSheet', (req, res) => {
  let sql = "DELETE FROM TimeSheet";

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.send({success: true})
    }
  })
})

///////// employee clock in clock out END /////////////

const galleryRoutes = require('./routes/gallery.route')
app.use('/gallery', galleryRoutes)

const reviewRoutes = require('./routes/reviews.route')
app.use('/api', reviewRoutes)