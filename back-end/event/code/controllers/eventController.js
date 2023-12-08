import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rawData = fs.readFileSync(path.resolve(__dirname, './event.json'));
const data = JSON.parse(rawData);

export function getAllEventsHandler() {
  res.status(200).json(data.events);
};

export const getEventById = (eventId) => {
  return data.events.find((e) => e.eventId === eventId);
};

export const getEventByIdHandler = (req, res) => {
  const eventId = req.params.eventId;
  const event = getEventById(eventId);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
};

export const createEvent = (newEvent) => {
  data.events.push(newEvent);
  fs.writeFileSync(path.resolve(__dirname, './event.json'), JSON.stringify(data, null, 2), 'utf8');
  return newEvent
};

export const createEventHandler = (req, res) => {
  const newEvent = req.body;
  const createdEvent = createEvent(newEvent);
  res.status(201).json(createdEvent);
};

