// server/routes/topicRoutes.js
const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic.js');

// Get all topics
router.get('/', async (req, res) => {
  const topics = await Topic.find({});
  res.json(topics);
});

// Get single topic by id
router.get('/:id', async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }
  res.json(topic);
});

// Create a new topic
router.post('/', async (req, res) => {
  const { name, userId } = req.body;
  const existingTopic = await Topic.findOne({ name });
  if (existingTopic) {
    return res.status(400).json({ error: 'Topic already exists' });
  }
  const newTopic = new Topic({ name, user: userId });
  await newTopic.save();
  res.json({ message: 'Topic created successfully', topic: newTopic });
});

// Update an existing topic
router.put('/:id', async (req, res) => {
  const { name, userId } = req.body;
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }
  topic.name = name;
  topic.user = userId;
  await topic.save();
  res.json({ message: 'Topic updated successfully', topic });
});

// Delete a topic
router.delete('/:id', async (req, res) => {
  const topic = await Topic.findById(req.params.id);
  if (!topic) {
    return res.status(404).json({ error: 'Topic not found' });
  }
  await topic.remove();
  res.json({ message: 'Topic deleted successfully' });
});

module.exports = router;
