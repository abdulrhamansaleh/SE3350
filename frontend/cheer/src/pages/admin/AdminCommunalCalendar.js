import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';
import './styles/CommunalCalendar.css';


const CreateEventModal = ({date, onClose}) => {
  const redirect = useNavigate()

  const [data, setData] = useState({
    title: "",
    description: "",
    transportation: "",
    start: "",
    end: ""
  });
  

  const handleChange = ({currentTarget:input}) => {
    setData({...data,[input.name]:input.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
      let url = '/calendar/create-event'
      const res = await axios.post(url, data)

      if (res.data.status == 200){
        console.log(res.data.message)
        onClose()
        window.location.href = '/admin';
      }
    }
    catch(err){
    }
  }

  return(
    <div className="modal-overlay">
      <div className="event_container">
        <h1 class="modal-title" > Event </h1>
        <div className="event_form_container">
          <div className="right">
            <form className="form_container" onSubmit={handleSubmit}>
              <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  onChange={handleChange}
                  value={data.title}
                  required
                  className="form-input"
              />
              <textarea
                placeholder="Description"
                name="description"
                onChange={handleChange}
                value={data.description}
                required
                className="form-input"
              />
              <textarea
                placeholder="Transportation"
                name="transportation"
                onChange={handleChange}
                value={data.transportation}
                required
                className="form-input"
              />
              <label for="appt-time">Starts</label>
              <input
                type="datetime-local"
                placeholder="Start Time"
                name="start"
                onChange={handleChange}
                value={data.start}
                required
                className="form-input"
              />
              <label for="appt-time">Ends</label>
              <input
                type="datetime-local"
                placeholder="End Time"
                name="end"
                onChange={handleChange}
                value={data.end}
                required
                className="form-input"
              />
              <div>
                <button type="Submit" className="btn">Create Event</button>
                <button onClick={onClose} className="btn">Exit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminCommunalCalendar() {
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


  const [selectedDate, setSelectedDate] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const onDateClick = (event) => {
    setSelectedDate(event.dateStr);
    setCreateModalOpen(true)
  };

  const handleCreateClose = () => setCreateModalOpen(false);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={allEvents}
        dateClick={onDateClick}
      />
      { createModalOpen &&
        <CreateEventModal 
          date={selectedDate}
          onClose={handleCreateClose}
        />
      }
    </>
  );
}

