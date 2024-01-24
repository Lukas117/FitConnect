import request from 'supertest';
import indexRouter from '../routes/index.js';
import express from 'express';

const app = express();
app.use('/', indexRouter);

describe('Index Route', () => {
  it('should respond with a 404 status code for GET request', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(404);
  });
});