import React from 'react'
import {useState} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

import axios from "axios";
import './styles/NewsletterUpload.css'

export default function NewsletterUpload() {
  const [file, setFile] = useState()
  const [status, setStatus] = useState()

  function handleFileChange(event){
    setFile(event.target.files[0])
  }

  const sendPDF = async (event) => {
    try {
      const form_data = new FormData();
      form_data.append('pdf', file); 
  
      let url = 'http://localhost:8080/admin/send-newsletter';
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const {data} = await axios.post(url, form_data, config);

      setStatus("pass")
      // success component with prop for message <SuccessModal message=data.message />

    } catch (err) {
      setStatus("fail")
      // error component with prop for message <ErrorModal cause=err />
    }
  };

  /*
  function Notification(props) {
    const requestStatus = props.requestStatus;
    if (requestStatus == "fail") {
      return <ErrorModal />;
    }
    return <SuccessModal />;
  }
  */

  return (
  <>
      {/* Display Success and Error Modal */}
      {/* <Notification requestStatus = {status} /> */}
      <h2>Cheer Newsletter</h2>
      <div class="file-upload-container">
        <div class="icon-container">
          <FontAwesomeIcon icon={faFilePdf} />
        </div>
        <form onSubmit={sendPDF}>
          <input type="file" name="file" onChange={handleFileChange} />
          <button class="send-file">Send Out</button>
        </form>
      </div>
  </>
  )
}