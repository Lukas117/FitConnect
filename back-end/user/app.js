const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const env = process.env;

const cors = require('cors');
app.use(cors());

app.get('/users', function (request, response) {
	response.send('Hello world');
});

app.get('/users/:id', function (request, response) {
	const userId = request.params.id;
	response.send('Hello world ' + userId);
});

app.listen(env.PORT, function () {
	console.log(`User microservice listening on port ${env.PORT}`);
});
