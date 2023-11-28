const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const env = process.env;

const cors = require('cors');
app.use(cors());

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

app.listen(env.PORT, function () {
	console.log(`User microservice listening on port ${env.PORT}`);
});
