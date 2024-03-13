import React, {useState} from 'react'
import CTable from '../../reusables/event_table/EventTable.js'
import { DatePicker  } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './styles/ManageEvents.css'

const ManageEvents = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [dropDownValue, setDropDownValue] = useState('all')

  const dropDownChange = () =>{
    let d = document.getElementById('select_type')
    setDropDownValue(d.value)
  }


    


  return (
    <div className='manage_events_background'>
        <div className='manage_events_currentEvents_container'>
          <div className='manage_events_calander_container'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
           
              {dropDownValue==='custom_time' ? 
              <div className='datepicker_container'> 
                <DatePicker id='sd' label={'Enter Start Date'} views={['year', 'month', 'day']} value={startDate} onChange={(nvalue)=>{setStartDate(nvalue)}}/>
                <DatePicker id='ed' label={'Enter End Date'} views={['year', 'month', 'day']} value={endDate} onChange={(nvalue)=>setEndDate(nvalue)}/>
                <button>Enter</button>
              </div>: 
              <div>
                <DatePicker disabled/>
                <DatePicker disabled/>
              </div> 
              }

              <select id='select_type' onChange={dropDownChange}>
                <option value='all'>All</option>
                <option value='future'>Future Events</option>
                <option value='past'>Past Events</option>
                <option value='custom'>Custom Time</option>
              </select>
            </LocalizationProvider>
          </div>
          <CTable start_date={`${startDate.$Y}-${parseInt(startDate.$M)+1}-${startDate.$D}`} end_date={`${endDate.$Y}-${parseInt(endDate.$M)+1}-${endDate.$D}`} url={'/admin/get/events'} type={dropDownValue}></CTable>
        </div>
        <div className='manage_events_create_edit_container'>

        </div>
    </div>
  )
}


export default ManageEvents