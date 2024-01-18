// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import eventRoutes from './routes/eventRoutes.js';

// Initialize express application
const app = express();

// Set the port for the server to listen on (the env might not work)
const port = process.env.PORT || 3012;

// enable CORS
app.use(cors());

// Use bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the eventRoutes for any requests to /api
app.use('/', eventRoutes);

// Handle 404 errors (might need to be in middleware)
app.use((req, res, next) => {
	try {
		//set header before response
		res.status(404).send("Sorry can't find that!");
	} catch (err) {
		next(err);
	}
});
app.use(errorHandler);

// Start the server and listen on the specified port
app.listen(port, () => {
	console.log(`🏀 Service is running on port ${port}`);
});
