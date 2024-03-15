import React, {useEffect, useState} from 'react';
import './Schedule.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios'

export default function Schedule() {
  const [allEvents, setEvents] = useState([])

  useEffect(() => {
    const getEvents = async () => {
      try{
        let url = '/calendar/running-events'
        let res = await axios.get(url)
    
        if (res.data.status == 200){
          console.log(res.data.results)
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
      />
    </div>
  );
}