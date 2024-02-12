import React, {useState} from 'react'
import './styles/NewsletterUpload.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';


function WaiverUpload() {
    const [file, setFile] = useState()

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
      <form onSubmit={uploadWaiver}>
        <input type="file" name="file" onChange={handleFileChange} />
        <button class="send-file">Send Out</button>
      </form>
    </div>
</>
  )
}

export default WaiverUpload