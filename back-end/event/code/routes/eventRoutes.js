import express from 'express';
import { getAllEvents, getEventById, createEvent } from '../controllers/eventController.js';

export const router = express.Router();

router.get('/events', (req, res) => {
  const events = getAllEvents();
  res.status(200).json(events);
});

router.get('/events/:eventId', (req, res) => {
  const eventId = req.params.eventId;
  const event = getEventById(eventId);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

router.post('/events', (req, res) => {
  const newEvent = req.body;
  const createdEvent = createEvent(newEvent);
  res.status(201).json(createdEvent);
});
