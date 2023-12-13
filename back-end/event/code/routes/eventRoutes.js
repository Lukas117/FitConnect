import express from 'express';
import {
    getEventList,
    getEventById,
    createEvent,
    updateEvent
} from '../controllers/eventController.js';

const router = express.Router();

router.get('/events', getEventList);

router.get('/events/:eventId', getEventById);

router.post('/events', createEvent);

router.put('/events/:eventId', updateEvent);

export default router;