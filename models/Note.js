const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  author: {
type: String
  },
  content: {
    type: String, required: true
  }, // Added required
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
  }, // Added required
  createdAt: {
    type: Date, default: Date.now
  }, // Added createdAt
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
