import React, {useState} from 'react'
import CTable from '../../reusables/event_table/EventTable.js'
import DatePickerComponent from '../../reusables/date_picker/DatePickerComponent.js'
import { DatePicker  } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import './styles/ManageEvents.css'

const ManageEvents = () => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  return (
    <div className='manage_events_background'>
        <div className='manage_events_currentEvents_container'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label={'Enter Start Date'} views={['year', 'month', 'day']} value={startDate} onChange={(nvalue)=>{console.log(nvalue.$M);setStartDate(nvalue)}}/>
            <DatePicker label={'Enter End Date'} views={['year', 'month', 'day']} value={endDate} onChange={(nvalue)=>setEndDate(nvalue)}/>
          </LocalizationProvider>
          <CTable start_date={`${startDate.$Y}-${parseInt(startDate.$M)+1}-${startDate.$D}`} end_date={`${endDate.$Y}-${parseInt(endDate.$M)+1}-${endDate.$D}`}></CTable>
        </div>
        <div className='manage_events_create_edit_container'>

        </div>
    </div>
  )
}


export default ManageEvents