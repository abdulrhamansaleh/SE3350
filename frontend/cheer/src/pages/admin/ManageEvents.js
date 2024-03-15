import React, {useState} from 'react'
import CTable from '../../reusables/event_table/EventTable.js'
import { DatePicker  } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Switch from '@mui/material/Switch';
import './styles/ManageEvents.css'
import dayjs from 'dayjs';

const ManageEvents = () => {
  const [rowData,setRowData]=useState({})
  const [checkboxState, setCheckboxState] = useState(false)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')


  const handleCallback = (childData)=>{
    setRowData(childData)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    fetch(`/admin/edit/event/${rowData.event_id}`,{
      method: 'POST',
      headers:{"Content-Type":"application/json" },
      body: JSON.stringify({event_id: rowData.event_id, title: rowData.title, description: rowData.description, start_time:`${rowData.start_time} ${startTime}`, end_time:`${rowData.end_time} ${endTime}`, transport_details: rowData.transport_details})
    }).then(response=>{
      if(response.ok){
        return response.json()
      }
    }).then(data=>{
      console.log(data)
    })
  }

  const handleChange = (e) =>{
    const name = e.target.name
    const value = e.target.value
    setRowData(values => ({...values, [name]:value}))
  }

  const onEndDateChange= (e) =>{
    if(e.$M<10){
      e.$M = parseInt(e.$M)+1
      e.$M = '0'+e.$M
    }
    if(e.$D<10){
      e.$D = '0'+e.$D
    }
    setRowData(data=> ({...data, ['end_time']:`${e.$y}-${e.$M}-${e.$D}`}))
  }
  const onStartDateChange= (e) =>{
    if(e.$M<10){
      e.$M = parseInt(e.$M)+1
      e.$M = '0'+e.$M
    }
    if(e.$D<10){
      e.$D = '0'+e.$D
    }
    setRowData(data=> ({...data, ['start_time']:`${e.$y}-${e.$M}-${e.$D}`}))
  }

  return (
    <div className='manage_events_background'>
        <div className='manage_events_currentEvents_container'>
          <div className='manage_events_calander_container'>
          </div>
          <CTable url={'/admin/get/events'} callback={handleCallback}></CTable>
          
        </div>
        <div className='manage_events_create_edit_container'>
          <form className='event_edit_form' onSubmit={handleSubmit}>
            <label>Event Name</label>
            <input name='title' value={rowData.title} onChange={handleChange}></input>
            <label >Event Description</label>
            <textarea className='event_edit_description' name='description' value={rowData.description} onChange={handleChange}></textarea>
            <label>Transport Details</label>
            <input title='transport_details' value={rowData.transport_details} onChange={handleChange}></input>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div>
                <label>Edit Date and Time?</label>
                <input type='checkbox' checked={checkboxState} onChange={()=>setCheckboxState(!checkboxState)}></input>
              </div>
              {
                checkboxState? 
                <div className='event_edit_subdiv'>
                <label>Enter New Data and Time</label> 
                <div className='datepicker_container'> 
                  <DatePicker id='sd' name='start_time'label={'Enter Start Date'} views={['year', 'month', 'day']} value={null} onChange={(nvalue)=>{onStartDateChange(nvalue)}}/>
                  <DatePicker id='ed' name='end_time'label={'Enter End Date'} views={['year', 'month', 'day']} value={null} onChange={(nvalue)=>{onEndDateChange(nvalue)}}/>
                </div>
                <div className='datepicker_container'> 
                  <TimePicker label={'Enter Start Time'} defaultValue={dayjs('2022-04-17T00:00')} onChange={(e)=>setStartTime(`${e.$H}:${e.$m}`)} />
                  <TimePicker label={'Enter End Time'} defaultValue={dayjs('2022-04-17T00:00')} onChange={(e)=>setEndTime(`${e.$H}:${e.$m}`)}/>
                </div>
                </div>
              :
              <div className='event_edit_subdiv'>
                <div className='datepicker_container'> 
                  <DatePicker id='sd' label={'Enter Start Date'} views={['year', 'month', 'day']} disabled/>
                  <DatePicker id='ed' label={'Enter End Date'} views={['year', 'month', 'day']} disabled/>
                </div>
                <div className='datepicker_container'> 
                  <TimePicker label={'Enter Start Time'} disabled />
                  <TimePicker label={'Enter End Time'} disabled/>
                </div>
              </div>
              }
            </LocalizationProvider>
            <div className='event_edit_button_container'>
              <input className="event_edit_submit_button" type="submit"></input>
            </div>
          </form>
        </div>
    </div>
  )
}
export default ManageEvents