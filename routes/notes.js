const express = require('express');
const requestPromise = require('request-promise');
const sanitizeHtml = require('sanitize-html');
const Note = require('../models/Note.js');
const authMiddleware = require('../middleware/auth.js');
const Topic = require('../models/Topic.js');
const axios = require('axios')

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

router.post('/correct', authMiddleware, async (req, res) => {

  const textToCheck = req.body.content;

  try {
    const languageToolResponse = await axios({
      method: 'POST',
      url: `https://api.textgears.com/correct?&ai=1&language=en-GB&key=${TEXT_GEARS_KEY}`,
      data: {
        text: textToCheck,

      },
      headers: {
        'Content-Type': 'application/json',
        'key': 'V8vgiz4nDnHa6VaD'
      }
    });
    res.json(languageToolResponse.data.response.corrected);
  } catch (error) {

    console.log(error)
    res.status(500).json({ error: 'Error occurred while checking text.' });
  }
}

);



module.exports = router;