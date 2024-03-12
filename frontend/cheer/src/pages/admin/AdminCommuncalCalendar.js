import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import './styles/CommunalCalendar.css';


const CreateEventModal = ({date, onClose}) => {
  const [data, setData] = useState({
    date: date,
    pick_up: "",
    drop_off: "",
    description: "",
  });

  const handleChange = ({currentTarget:input}) => {
    setData({...data,[input.name]:input.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try {
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
              <textarea
                placeholder="Event Description"
                name="description"
                onChange={handleChange}
                value={data.description}
                required
                className="form-input"
              />
              <input
                type="text"
                placeholder="Pickup Details"
                name="pick_up"
                onChange={handleChange}
                value={data.pick_up}
                required
                className="form-input"
              />
              <input
                type="text"
                placeholder="Dropoff Details"
                name="drop_off"
                onChange={handleChange}
                value={data.drop_off}
                required
                className="form-input"
              />
              <input className = "form-input" value={date} disabled />
              <button type="submit" className="btn">Create Event</button>
              <button onClick={onClose} className="btn">Exit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminCommunalCalendar() {
  // API call to get all events
  const allEvents = [{ title: 'test 1', date: '2024-03-08' }, { title: 'test 2', date: '2024-03-09' }];
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

