import {
  createEvent,
  getEventById,
  getEventList,
  updateEvent,
  updateEventPlayerList
} from '../controllers/eventController.js';
import {
  createEventData,
  getEventData,
  getEventListData,
  updateEventData,
  updateEventPlayerListData
} from '../adapters/supabaseAdapter.js';

jest.mock('../adapters/supabaseAdapter.js', () => ({
  createEventData: jest.fn(),
  getEventData: jest.fn(),
  getEventListData: jest.fn(),
  updateEventData: jest.fn(),
  updateEventPlayerListData: jest.fn(),
}));

describe('Event Controller', () => {
  it('should get a list of events', async () => {
    const mockData = [
      // idk what data yet
    ];

    getEventListData.mockResolvedValue(mockData);

    const result = await getEventList();

    expect(result).toEqual(mockData);
  });

  it('should get an event by id', async () => {
    const eventId = 'event-id'; // Replace 
    const mockData = {
      //fill
    };

    getEventData.mockResolvedValue(mockData);

    const result = await getEventById(eventId);

    expect(result).toEqual(mockData);
  });

  it('should create an event', async () => {
    const eventData = {
      // fill
    };

    const mockData = {
      // fill
    };

    createEventData.mockResolvedValue(mockData);

    const result = await createEvent(eventData);

    expect(result).toEqual(mockData);
  });

  it('should update an event', async () => {
    const eventId = 'event-id'; // Replace
    const eventData = {
//fill
    };

    const mockData = {
//fill
    };

    updateEventData.mockResolvedValue(mockData);

    const result = await updateEvent(eventId, eventData);

    expect(result).toEqual(mockData);
  });

  it('should update the player list of an event', async () => {
    const eventId = 'event-id'; // Replace 
    const playerListData = {
//fill
    };

    const mockData = {
//fill
    };

    updateEventPlayerListData.mockResolvedValue(mockData);

    const result = await updateEventPlayerList(eventId, playerListData);

    expect(result).toEqual(mockData);
  });
});
