const express = require('express');
const router = express.Router();
const cors = require('cors');

const app = express();
const port = 3000;

router.use(cors());

router.get('/users', function (request, response) {
    response.send('Hello world');
})

router.get('/users/:id', function (request, response) {
    const userId = request.params.id;
    response.send('Hello world ' + userId);
})

router.listen(port, function () {
    console.log(`User microservice listening on port ${port}`);
})