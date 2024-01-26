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

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/", express.static('../client/public'))
// app.use("/",express.static('../client/build'))

dotenv.config()
const port = process.env.port;

app.listen(port, ()=>{
    console.log(`Listen on port ${port}`)
})

