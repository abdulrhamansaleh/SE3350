import React, {useEffect, useState} from 'react';
import './Schedule.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios'

export default function Schedule() {
  const [allEvents, setEvents] = useState([])

  const [eventView, setView] = useState(false)
  const [eventData, setData] = useState({})

  const view = async (event) => {
    const date_start = event.event._instance.range.start
    const title = event.event._def.title

    const params = {
      title: title,
      start: date_start,
    }

    let url = "/calendar/event-details"
    const data = await axios.get(url, {params})

    setView(true)
  }

  useEffect(() => {
    const getEvents = async () => {
      try{
        let url = '/calendar/running-events'
        let res = await axios.get(url)
    
        if (res.data.status == 200){
          setEvents(res.data.results)
        }
      }catch(err){
        console.log(err)
      }
    }

    getEvents()
  }, []) // no dependencies, run only once a render

  return (
    <div class="public-calendar">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={allEvents}
        eventClick={view}
      />
      { eventView &&
        <ViewEvent />
      }
    </div>
  );
}


function ViewEvent(){
  return (
    <div className="modal-overlay">
    <div className="event_container">
      <h1 class="modal-title" > Event </h1>
      <div className="event_form_container">
        <div className="right">
          <p>Title</p>
        </div>
      </div>
    </div>
  </div>
  )
}