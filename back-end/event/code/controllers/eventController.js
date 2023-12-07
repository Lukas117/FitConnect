import fs from 'fs';
import eventData from './event.json' assert { type: 'json' };

const path = './event.json';

const data = eventData

export function getAllEvents() {
  return data.events;
};

export const getEventById = (eventId) => {
  return data.events.find((e) => e.eventId === eventId);
};

export const createEvent = (newEvent) => {
  data.events.push(newEvent);
  fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
  return newEvent;
};
