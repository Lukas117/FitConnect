import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


// Get the directory name of the current module. This is necessary because __dirname is not available in ES modules.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Read the event.json file. fs.readFileSync is used to read the file synchronously.
const rawData = fs.readFileSync(path.resolve(__dirname, './event.json'));
// Parse the JSON data into a JavaScript object. JSON.parse is used to convert the JSON data into an object that can be used in the JavaScript code.
const data = JSON.parse(rawData);

// get all events (might not be working)
export function getAllEventsHandler() {
  res.status(200).json(data.events);
};

// finds events by the id
export const getEventById = (eventId) => {
  return data.events.find((e) => e.eventId === eventId);
};

// handles get events by id /api/events/:eventid
export const getEventByIdHandler = (req, res) => {
  const eventId = req.params.eventId;
  const event = getEventById(eventId);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
};

// create event and write to event.json
export const createEvent = (newEvent) => {
  data.events.push(newEvent);
  fs.writeFileSync(path.resolve(__dirname, './event.json'), JSON.stringify(data, null, 2), 'utf8');
  return newEvent
};

// hande the post request to create event
export const createEventHandler = (req, res) => {
  const newEvent = req.body;
  const createdEvent = createEvent(newEvent);
  res.status(201).json(createdEvent);
};

