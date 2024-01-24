import { createClient } from '@supabase/supabase-js';
import {
  getFacilityList,
  getFacilityById,
  createFacility,
  updateFacility
} from '../controllers/facilityController.js';

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn().mockReturnValue({
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnValue({
      data: [
        {
          facilityId: '55',
          name: 'Test Facility 1',
          location: 'Test Location 1',
        },
        {
          facilityId: 'facility-id-2',
          name: 'Test Facility 2',
          location: 'Test Location 2',
        },
      ],
    }),
    insert: jest.fn().mockResolvedValue({
      data: {
        facilityId: '55',
        name: 'Test Facility',
        location: 'Test Location',
      },
      error: null,
    }),
    update: jest.fn().mockReturnThis(),
    eq: jest.fn().mockResolvedValue({
        data: [
            {
                facilityId: '55',
                name: 'Test Facility',
                location: 'Test Location',
            },
        ],
        error: null,
    }),
    single: jest.fn().mockResolvedValue({
      data: {
        facilityId: '55',
        name: 'Test Facility',
        location: 'Test Location',
      },
      error: null,
    }),
  }),
}));

const createRequest = (overrides) => ({
    body: {},
    params: {},
    ...overrides,
    });
const createResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
    };


describe('Facility Controller', () => {
    it('should get a list of facilities', async () => {
      const req = createRequest();
      const res = createResponse();
      const next = jest.fn();
  
      await getFacilityList(req, res, next);
        expect(res.json).toHaveBeenCalledWith(expect.any(Array));
        expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.status).toHaveBeenCalledTimes(1);

    });
  
    it('should create a facility', async () => {
      const req = createRequest({
        body: {
          name: 'Test Facility',
          location: 'Test Location',
        },
      });
      const res = createResponse();
      const next = jest.fn();
  
      await createFacility(req, res, next);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.status).toHaveBeenCalledTimes(1);
    });
  
    it('should update a facility', async () => {
      const req = createRequest({
        params: {
          id: '55',
        },
        body: {
          name: 'Updated Facility',
          location: 'Updated Location',
        },
      });
      const res = createResponse();
      const next = jest.fn();
  
      await updateFacility(req, res, next);
      
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.status).toHaveBeenCalledTimes(1);
    });
  });