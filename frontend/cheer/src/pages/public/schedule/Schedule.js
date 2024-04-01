import React, {useEffect, useState} from 'react';
import './Schedule.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios'

export default function Schedule() {
  const [allEvents, setEvents] = useState([])

  const [eventView, setView] = useState(false)
  const [eventData, setDetails] = useState()

  const handleCreateClose = () => setView(false);

  const view = async (event) => {
    const date_start = event.event._instance.range.start
    const title = event.event._def.title

    const params = {
      title: title,
      start: date_start,
    }
    
    try{
      let url = "/calendar/event-details"
      const data = await axios.get(url, {params})
  
      setDetails(data.data.result[0])
      setView(true)
    }catch(err){
      setDetails("Error")
    }

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
        <ViewEvent onClose = {handleCreateClose} event = {eventData} />
      }
    </div>
  );
}


const ViewEvent = ({onClose, event}) => {
  if (event){
    const title = event.title
    const description = event.description
    const start = event.start_time
    const end = event.end_time
    const transport = event.transport_details

    return(
      <div className="modal-overlay">
        <div className="event_container">
          <h1 class="modal-title" > Event </h1>
          <div className="right">
            <div className="form_container">
              <label>Title</label>
                <input className="form-input" value={title} readOnly/>
              <label>Description</label>
                <input className="form-input" value={description} readOnly/>
              <label>Transportation</label>
                <input className="form-input" value={transport} readOnly/>
              <label>Date</label>
                <p className="form-input" style={{textAlign: 'center'}}>{humanDate(start)} <b>-</b> {humanDate(end)}</p>
              <div>
                <button onClick={onClose} className="btn">Exit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }else{
    return(
      <div className="modal-overlay">
      <div className="event_container">
        <h1 class="modal-title" > Event Error </h1>
        <div className="right">
          <div className="form_container">
            <label>Please Select The Starting Date</label>
            <div>
              <button onClick={onClose} className="btn">Okay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  function humanDate(isoDateString){
    const date = new Date(isoDateString);

    // Extract the date parts
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();
  
    // Format the date parts to ensure two digits
    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
  
    // Extract the time parts
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  
    // Format the hours to ensure two digits
    const formattedHours = hours.toString().padStart(2, '0');
  
    // Combine the parts into a single string
    return `${year}-${formattedMonth}-${formattedDay} at ${formattedHours}:${minutes} ${ampm}`;
  }
}