// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import sportRoutes from './routes/sportRoutes.js';

// Initialize express application
const app = express();

// Set the port for the server to listen on (the env might not work)
const port = process.env.PORT || 3014;

// Enable CORS
app.use(cors());

// Use bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());

// Support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the sportRoutes for any requests to /api
app.use('/', sportRoutes);

// Handle 404 errors
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
