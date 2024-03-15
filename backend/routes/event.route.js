const express = require('express');
const router = express.Router();
const db = require('../../db/db');

/* Events for display */
router.get('/running-events', async(request, response) => {

})

/* Add Events to Calendar */
router.post('/create-event', async(request, response) => {
    // parse date into start and end times 
    const start_time = req.body.date + start + ":00"
    const end_time = req.body.date + end + ":00"
    let event = "INSERT INTO Events (title, description, start_time, end_time, transport_details) VALUES (?, ?, ?, ?, ?, ?)"
    /*

        request.body => 
                            {
                                date: '2024-03-06',
                                title: 'event',
                                description: 'event description',
                                transportation: 'event transport',
                                start: '15:31',
                                end: '19:37'
                            }
    */
})

/* Remove Events from Calendar */
router.delete('/remove-event', async(request, response) => {

})
/* Edit Events In Calendar */
router.patch('/edit-event', async(request,response) => {
})

module.exports = router;