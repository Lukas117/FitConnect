import express from 'express';
const app = express();

import { createProxyMiddleware } from 'http-proxy-middleware';

const userProxy = createProxyMiddleware({
    target: 'http://localhost:3011',
    changeOrigin: true
  });

import { config } from 'dotenv';
config();
const env = process.env;

import cors from 'cors';
app.use(cors());

app.get('/users', userProxy)

app.get('/users/:id', function (request, response) {
    const userId = request.params.id;
    response.send('Hello world ' + userId);
})

app.listen(env.PORT, function () {
    console.log(`Gateway microservice listening on port ${env.PORT}`);
})