const express = require('express');
const router = express.Router();
const db = require('../../db/db');

/* Events for display */
router.get('running-events', async(request, response) => {

})

/* Add Events to Calendar */
router.post('create-event', async(request, response) => {
    let event = "INSERT INTO Events (title, description, date, start_time, end_time, transport_details) VALUES (?, ?, ?, ?, ?, ?)"
    console.log(request.body)
})
/* Remove Events from Calendar */
router.delete('remove-event', async(request, response) => {

})
/* Edit Events In Calendar */
router.patch('edit-event', async(request,response) => {

})

module.exports = router;