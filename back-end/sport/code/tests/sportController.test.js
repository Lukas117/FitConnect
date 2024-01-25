
jest.mock('@supabase/supabase-js', () => ({
    createClient: jest.fn().mockReturnValue({
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnValue({
            data: [
                {
                    sportId: '1',
                    sportName: 'Test Sport 1',
                },
                {
                    sportId: 'sport-id-2',
                    sportName: 'Test Sport 2',
                },
            ],
        }),
        insert: jest.fn().mockResolvedValue({
            data: {
                sportId: '55',
                sportName: 'Basketball',
            }, error: null
        }),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
            data: {
                sportId: '1',
                sportName: 'Test Sport',
            },
            error: null,
        }),
        update: jest.fn().mockReturnThis(),
    }),
}));

import {
    getSportById,
    getSportList,
    createSport,
    updateSport,
} from '../controllers/sportController.js';

describe('Sport Controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            body: {},
            params: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        next = jest.fn();
    });

    describe('getSportList', () => {
        it('should return a list of sports', async () => {
            await getSportList(req, res, next);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalled();
        });
    });

    describe('createSport', () => {
        it('should create a sport', async () => {
            req.body = { sportName: 'Basketball' };
            await createSport(req, res, next);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalled();
        });
    });

    describe('updateSport', () => {
        it('should update a sport', async () => {
            req.body = { sportName: 'Basketball' };
            req.params.sportId = '1';

            await updateSport(req, res, next);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalled();
        });
    });
});