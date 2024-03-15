const express = require('express');
const router = express.Router();
const db = require('../../db/db');

/* Events for display */
router.get('/running-events', async(request, response) => {
    function getDate(date){return date.toISOString().split('T')[0]}

    const today = new Date();
    const nextMonthStart = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    // Correct calculation of the current month's end date
    const currentMonthEnd = new Date(nextMonthStart.getTime() - 1);

    const start = today.toISOString().split('T')[0];
    const end = currentMonthEnd.toISOString().split('T')[0];

    // Improved query to fetch events that are within or span across the current month
    const runningEventsQuery = `
        SELECT title, start_time, end_time 
        FROM Events
        WHERE (start_time BETWEEN ? AND ?)
        OR (end_time BETWEEN ? AND ?)
        OR (start_time <= ? AND end_time >= ?)
    `;
    const range = [start + " 00:00:00", end + " 23:59:59", start + " 00:00:00", end + " 23:59:59", start + " 00:00:00", end + " 23:59:59"];

    db.query(runningEventsQuery, range, (err, result) => {
        if (err) {
            console.log("[ERR]" + err);
        } else {
            var results = []
            console.log(result)
            for (let i = 0; i < result.length; i++){
                const title = result[i].title

                if (getDate(result[i].start_time) == getDate(result[i].end_time)){
                    const event_date = getDate(result[i].start_time)

                    results.push({title: title, date: event_date})
                }
                else {
                    const event_start = new Date(getDate(result[i].start_time));
                    const event_end = new Date(getDate(result[i].end_time));

                    const date_range = Math.abs((event_end - event_start) / (1000 * 60 * 60 * 24));

                    results.push({title: title+"...", date: getDate(event_start)})

                    for (let j = 1; j < date_range; j++) {
                        let currentDay = new Date(event_start);
                        currentDay.setDate(event_start.getDate() + j);
                        
                        results.push({title:"...", date: getDate(currentDay)});
                    }

                    results.push({title: "..."+title, date: getDate(event_end)})
            }
            }

            response.send({
                status: 200,
                results: results,
            });
        }
    });
})

/* Details of an Event */
router.get('/event-details', async(request, reponse) => {

})

/* Add Events to Calendar */
router.post('/create-event', async(request, response) => {
    const start_time = request.body.start
    const end_time = request.body.end
    const title = request.body.title 
    const description = request.body.description
    const transportation = request.body.transportation

    let event = "INSERT INTO Events (title, description, start_time, end_time, transport_details) VALUES (?, ?, ?, ?, ?)"
    let values = [title, description, start_time, end_time, transportation]

    db.query(event, values, (err, result) => {
        if (err) {
            response.send(
                {
                    message: `[ERR] something went wrong when creating event: ${title}`,
                }
            )
        }
        else{
            response.send(
                {
                    message: `created event: ${title}`,
                    status: 200
                }
            )
        }
    })
})

/* Remove Events from Calendar */
router.delete('/remove-event', async(request, response) => {

})
/* Edit Events In Calendar */
router.patch('/edit-event', async(request,response) => {
})

module.exports = router;