import React, {useState} from 'react'
import CTable from '../../reusables/event_table/EventTable.js'
import { DatePicker  } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Switch from '@mui/material/Switch';
import './styles/ManageEvents.css'
import dayjs from 'dayjs';
import axios from 'axios';


const ManageEvents = () => {
  const [rowData,setRowData]=useState({})
  const [checkboxState, setCheckboxState] = useState(false)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [waivers, setWaivers] = useState([])
  const [files, setFiles] = useState({});


  const handleCallback = (childData)=>{
    setRowData(childData)
    fetch(`/admin/get/waivers?`+new URLSearchParams({
      event_id: childData.event_id
    }),{
      method:"GET",
      headers:{"Content-Type":"application/json" },
    }).then(response=>{
      if(response.ok){
        return response.json()
      }
    }).then(data=>{
      setWaivers(data)
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    let fD = new FormData()
    Object.keys(rowData).forEach(key => {
      fD.append(key, rowData[key])
    })
    Object.keys(files).forEach(key=>{
      fD.append(key, files[key])
    })

  

    const config = {headers: {'Content-Type': 'multipart/form-data'}}
    try{
      const data = axios.post(`/admin/edit/event/${rowData.event_id}`, fD, config)
      
    }catch{

    }
    // fetch(`/admin/edit/event/${rowData.event_id}`,{
    //   method: 'POST',
    //   headers:{"Content-Type":"multipart/form-data" },
    //   body: JSON.stringify({
    //     event_id: rowData.event_id, 
    //     title: rowData.title, 
    //     description: rowData.description, 
    //     start_time:`${rowData.start_time} ${startTime}`, 
    //     end_time:`${rowData.end_time} ${endTime}`, 
    //     transport_details: rowData.transport_details, 
    //     files:files})
    // }).then(response=>{
    //   if(response.ok){
    //     return response.json()
    //   }
    // }).then(data=>{
    //   console.log(data)
    // })
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

  const deleteWaiver = (e) =>{
    console.log(e.target.id)
    fetch('/admin/event/delete/waiver?'+new URLSearchParams({
      event_id: e.target.id
    }),{
      method:"GET",
      headers:{"Content-Type":"multipart/form-data" },
    }).then(response=>{
      if(response.ok){
        console.log(response.json())
      }
    })
  }

  const handleMultipleUpload = (f) =>{
    // const uploaded = [...files]
    // for(var fi of f){
    //   uploaded[fi.name]=fi
    // }
    // setFiles(uploaded);
    for(var fi of f){
      console.log(fi)
      setFiles(pf => ({...pf, [fi.name]:fi}))
    }
  }

  const handleFiles = (e) =>{
    const choosenFiles = Array.prototype.slice.call(e.target.files)
    handleMultipleUpload(choosenFiles)
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
            <label>Waivers</label>
            {
              waivers.map((r)=>{
                return(
                  <div className='waiverrow_background'>
                      <div className='waiverrow_name_container'>
                        {r.name}
                      </div>
                      <button type="button" id={r.waiver_id} key={r.waiver_id} onClick={(e)=>deleteWaiver(e)}>
                        X
                      </button>
                  </div>
                )
              })
            }
            <input type="file" className='edit_event_file_upload' multiple onChange={handleFiles} accept='application/pdf'/>
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


// const WaiverRow = (props) =>{
//   return(
//     <div className='wavierrow_background'>
//       {props.data_name}
//     </div>
//   )
// }

export default ManageEvents