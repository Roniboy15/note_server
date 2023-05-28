const express = require('express');
const sanitizeHtml = require('sanitize-html');
const Note = require('../models/Note.js');
const authMiddleware = require('../middleware/auth.js');
const Topic = require('../models/Topic.js');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:topic', authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id, topic: req.params.topic });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    // Check if topic already exists
    let topic = await Topic.findOne({ name: req.body.topic });
    
    // If it doesn't exist, create a new one
    if (!topic) {
      topic = new Topic({ 
        name: req.body.topic,
        user: req.user._id,
        createdAt: new Date()
      });
      await topic.save();
    }

    // Sanitize content
    const sanitizedContent = sanitizeHtml(req.body.content);

    const newNote = new Note({
      author: req.body.author || '',
      content: sanitizedContent,
      topic: topic._id, // reference to the topic id
      user: req.user._id,
    });
    const savedNote = await newNote.save();
    res.json(savedNote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;