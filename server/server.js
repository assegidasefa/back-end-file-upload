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

// Define an API route for file upload
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

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
