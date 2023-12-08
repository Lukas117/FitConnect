import express from 'express';
import { getAllEventsHandler, getEventByIdHandler, createEventHandler } from '../controllers/eventController.js';

export const router = express.Router();

router.get('/events', getAllEventsHandler);

router.get('/events/:eventId', getEventByIdHandler);

router.post('/events', createEventHandler);
