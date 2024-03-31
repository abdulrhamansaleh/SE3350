require('dotenv').config();
const express = require('express');
const { google } = require('googleapis');
const router = express.Router();

const drive = google.drive({
  version: 'v3',
  auth: new google.auth.GoogleAuth({
    keyFile: './gallery.json',
    scopes: ['https://www.googleapis.com/auth/drive'],
  }),
});

router.get('/api/images', async (req, res) => {
    try {
      const response = await drive.files.list({
        q: `'15ghQkPaPl66emlzHfGtGibiymFQ5-18Q' in parents and trashed=false`,
        fields: 'files(id, name, webViewLink, thumbnailLink, exportLinks, webContentLink)',
      });
      console.log('Response from Google Drive API:', response);
      const images = response.data.files.map((file) => ({
        original:  file.webViewLink|| `https://drive.google.com/file/d/${file.id}/preview`, 
        thumbnail: file.thumbnailLink || file.webViewLink,
      }));
      res.json(images);
      console.log('Images with IDs:', images);
    } catch (error) {
      console.error('The API returned an error: ', error.message);
      res.status(500).json({ error: error.message });
    }
  });
  
  
  
  




module.exports = router;