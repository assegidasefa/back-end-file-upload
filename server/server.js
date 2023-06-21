// server.js

const express = require('express');
const multer = require('multer');
const connectDB = require('../db');
const FileModel = require('../model/FileModel');
const cors = require("cors")
const app = express();

// Enable Cors
app.use(cors());



// Connect to MongoDB
connectDB();

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Define an API route for file upload // int single file uploading we use upload.single 
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { filename, path } = req.file;

    // Create a new document using the FileModel
    const file = new FileModel({
      filename,
      filepath: path,
    });

    // Save the file document to the database
    await file.save();

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'An error occurred during file upload' });
  }
});


// Define an API route for file upload // for multi file upload we use upload.array
app.post('/api/multi-upload', upload.array('files'), async (req, res) => {
  try {
    const uploadedFiles = req.files;

    // Process each uploaded file
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const { originalname, path } = file;

      // Create a new document using the FileModel
      const fileModel = new FileModel({
        filename: originalname,
        filepath: path,
      });

      // Save the file document to the database
      await fileModel.save();
    }

    res.status(200).json({ message: 'Files uploaded successfully' });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ error: 'An error occurred during file upload' });
  }
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
