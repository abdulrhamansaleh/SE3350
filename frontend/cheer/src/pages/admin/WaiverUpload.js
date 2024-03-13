import React, {useState, useEffect} from 'react'
// import './styles/WaiverUpload.css'
import './styles/NewsletterUpload.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';


function WaiverUpload() {
    const [file, setFile] = useState()
    const [events, setEvents] = useState([])

    useEffect(()=>{
      fetch("/event/get/events",{

      }).then(
        response=> {if(response.ok)return response.json()}
      ).then(data=>setEvents(data))
    },{})

    function handleFileChange(event){
      setFile(event.target.files[0])
    }
  
    function uploadWaiver(){
      // call /send-newsletter in API
    }
  return (
    <>
    <h2>Waiver Event Upload</h2>
    <div class="file-upload-container">
      <div class="icon-container">
        <FontAwesomeIcon icon={faFilePdf} />
      </div>
      <form onSubmit={uploadWaiver} className='waiver_upload_form'>
        <div className='waiver_upload_file_container'>
          <input type="file" name="file" onChange={handleFileChange} />
          <button class="send-file">Upload Waiver</button>
        </div>
        <select className='waiver_upload_dropdown'>
          {/* {events.map((event)=>{
            return(
              <option>{event.name}</option>
            )
          })} */}
        </select>
      </form>
    </div>
</>
  )
}

export default WaiverUpload