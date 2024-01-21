import express from 'express';
import supertest from 'supertest';
import eventRoutes from '../routes/eventRoutes.js';

const app = express();
app.use(express.json());
app.use('/', eventRoutes);

const request = supertest(app);

jest.mock('../controllers/eventController.js', () => ({
  getEventList: jest.fn(),
  getEventById: jest.fn(),
  createEvent: jest.fn(),
  updateEvent: jest.fn(),
  updateEventPlayerList: jest.fn(),
}));

describe('Event Routes', () => {
  it('should get a list of events', async () => {
    const mockData = [
      // fill
    ];
    jest.spyOn(require('../controllers/eventController.js'), 'getEventList').mockResolvedValue(mockData);

    const res = await request.get('/events');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockData);
  });

  it('should get an event by id', async () => {
    const eventId = 'event-id'; // Replace
    const mockData = {
//fill
    };
    jest.spyOn(require('../controllers/eventController.js'), 'getEventById').mockResolvedValue(mockData);

    const res = await request.get(`/events/${eventId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(mockData);
  });

  it('should create an event', async () => {
    const eventData = {
//fill
    };
    const mockData = {
//fill
    };
    jest.spyOn(require('../controllers/eventController.js'), 'createEvent').mockResolvedValue(mockData);

    const res = await request.post('/events').send(eventData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockData);
  });

  it('should update an event', async () => {
    const eventId = 'event-id'; // Replace 
    const eventData = {
//fill
    };
    const mockData = {
//fill
    };
    jest.spyOn(require('../controllers/eventController.js'), 'updateEvent').mockResolvedValue(mockData);

    const res = await request.put(`/events/${eventId}`).send(eventData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockData);
  });

  it('should update the player list of an event', async () => {
    const eventId = 'event-id'; // Replace '
    const playerListData = {
//fill
    };
    const mockData = {
//fill
    };
    jest.spyOn(require('../controllers/eventController.js'), 'updateEventPlayerList').mockResolvedValue(mockData);

    const res = await request.patch(`/events/${eventId}`).send(playerListData);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockData);
  });
});
