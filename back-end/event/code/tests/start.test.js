import request from 'supertest';
import app from '../start.js';

describe('Start Server', () => {
  it('should respond with 404 for non-existent routes', async () => {
    const res = await request(app).get('/non-existent-route');
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual("Sorry can't find that!");
  });

  it('should respond with 200 for existing routes', async () => {
    const res = await request(app).get('/'); // Replace 
    expect(res.statusCode).toEqual(200);
  });
});