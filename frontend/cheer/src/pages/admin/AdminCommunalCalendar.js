import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import axios from 'axios';
import './styles/CommunalCalendar.css';


const CreateEventModal = ({date, onClose}) => {
  const [data, setData] = useState({
    date: date,
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
                type="time"
                placeholder="Start Time"
                name="start"
                onChange={handleChange}
                value={data.start}
                required
                className="form-input"
              />
              <label for="appt-time">Ends</label>
              <input
                type="time"
                placeholder="End Time"
                name="end"
                onChange={handleChange}
                value={data.end}
                required
                className="form-input"
              />
              <input className = "form-input" value={date} disabled />
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
  // API call to get all events
  const allEvents = [{ title: 'test 1', date: '2024-03-08' }, { title: 'test 2', date: '2024-03-08' }];
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

