import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import './styles/NewsletterUpload.css';

export default function NewsletterUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  const sendPDF = async (event) => {
    event.preventDefault(); // Prevent the form from causing a page reload
    if (!file) {
      setStatus("no-file");
      return; // Early return if no file is selected
    }

    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const url = '/admin/send-newsletter'
      let result = await axios.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setStatus(result.data.message);
    } catch (err) {
      setStatus("fail");
    }
  };

  return (
    <>
      <h2>Cheer Newsletter</h2>
      <div className="file-upload-container">
        <div className="icon-container">
          <FontAwesomeIcon icon={faFilePdf} />
        </div>
        <form onSubmit={sendPDF}>
          <input type="file" name="file" onChange={handleFileChange} />
          <button className="send-file">Send Out</button>
        </form>
      </div>
      <div>{status}</div>
    </>
  );
}
