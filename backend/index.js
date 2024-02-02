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
    console.log(req.body)
    res.send({
      token: "false",
      other: "idk",
      username: req.body.username,
      password: req.body.password,
    });
  });

dotenv.config()
//const port = process.env.port;
const port = 8080
app.listen(port, ()=>{
    console.log(`Listen on port ${port}`)
})

