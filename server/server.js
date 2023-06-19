const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer upload
const upload = multer({
  storage: storage
}).single('file');

// Handle file upload
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      // Handle upload error
      console.error('Error uploading file:', err);
      res.status(500).json({ error: 'Failed to upload file' });
    } else {
      // File uploaded successfully
      res.json({ message: 'File uploaded successfully' });
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
