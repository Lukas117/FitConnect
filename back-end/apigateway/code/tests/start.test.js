import request from 'supertest';
import app from '../start.js';

describe('App', () => {
  it('should be listening at the specified port', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});