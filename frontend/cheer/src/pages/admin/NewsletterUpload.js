import React from 'react'
import {useState} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';

import './styles/NewsletterUpload.css'

export default function NewsletterUpload() {
  const [file, setFile] = useState()

  function handleFileChange(event){
    setFile(event.target.files[0])
  }

  function sendOutNewsletter(){
    // get a list of users that are subsrcibed (apiroute: to get all users subscribed to newsletter)
    // use a mailing API to send file to all users
  }

  return (
  <>
      <h2>Cheer Newsletter</h2>
      <div class="file-upload-container">
        <div class="icon-container">
          <FontAwesomeIcon icon={faFilePdf} />
        </div>
        <form onSubmit={sendOutNewsletter}>
          <input type="file" name="file" onChange={handleFileChange} />
          <button class="send-file">Send Out</button>
        </form>
      </div>
  </>
  )
}