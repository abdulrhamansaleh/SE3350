const express = require('express');
const router = express.Router();

const db = require('../../db/db');

router.post('/get/events', async(req,res)=>{
    var q = 'SELECT title FROM Events'
    db.query()
})