import { createClient } from '@supabase/supabase-js';

// Mock the supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn().mockReturnValue({
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnValue({
      data: [
        {
          id: 'event-id-1',
          name: 'Test Event 1',
          date: '2022-12-31',
          location: 'Test Location 1',
        },
        {
          id: 'event-id-2',
          name: 'Test Event 2',
          date: '2023-01-01',
          location: 'Test Location 2',
        },
      ],
    }),
    insert: jest.fn().mockResolvedValue({
      data: {
        id: 'event-id',
        name: 'Test Event',
        date: '2022-12-31',
        location: 'Test Location',
      },
      error: null,
    }),
    update: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({
      id: '55',
      name: 'Test Event',
      date: '2022-12-31',
      location: 'Test Location',
    }),
  }),
}));

// Correctly import the functions
import {
  getEventList,
  getEventById,
  createEvent,
  updateEvent,
  updateEventPlayerList,
} from '../controllers/eventController.js';

describe('Event Controller', () => {
  it('should get a list of events', async () => {
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await getEventList(req, res, next);

    expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.status).toHaveBeenCalledTimes(1);
  });

  it('should create an event', async () => {
    const req = {
      body: {
        name: 'Test Event',
        date: '2022-12-31',
        location: 'Test Location',
      },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await createEvent(req, res, next);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status).toHaveBeenCalledTimes(1);
  });

  it('should update an event', async () => {
    const req = {
      params: { eventId: 'event-id' },
      body: {
        name: 'Updated Test Event',
        date: '2022-12-31',
        location: 'Updated Test Location',
      },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await updateEvent(req, res, next);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status).toHaveBeenCalledTimes(1);
  });

  it('should update an event player list', async () => {
    const req = {
      params: { id: 'event-id' },
      body: {
        playerList: ['player-id-1', 'player-id-2'],
      },
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await updateEventPlayerList(req, res, next);

    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.status).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if an error occurs during event creation', async () => {
    await expect(createEvent(null)).rejects.toThrow();
  });

  it('should throw an error if an error occurs during event update', async () => {
    await expect(updateEvent(null, null)).rejects.toThrow();
  });

  it('should throw an error if an error occurs during event player list update', async () => {
    await expect(updateEventPlayerList(null, null)).rejects.toThrow();
  });

  it('should throw an error if an error occurs during event retrieval', async () => {
    await expect(getEventById(null)).rejects.toThrow();
  });

  it('should throw an error if an error occurs during event list retrieval', async () => {
    await expect(getEventList()).rejects.toThrow();
  });

  it('should throw an error if an error occurs during event update', async () => {
    await expect(updateEvent(null, null)).rejects.toThrow();
  });
});
