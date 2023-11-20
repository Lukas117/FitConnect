const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/users', function (request, response) {
    res.send('Hello world');
})

app.get('/users/:id', function (request, response) {
    const userId = request.params.id;
    res.send('Hello world' + userId);
})

app.listen(port, function () {
    console.log(`User microservice listening on port ${port}`);
})