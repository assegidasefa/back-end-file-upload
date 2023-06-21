// FileModel.js

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
});

const FileModel = mongoose.model('File', fileSchema);

module.exports = FileModel;
