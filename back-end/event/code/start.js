// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router as eventRoutes } from './routes/eventRoutes.js';

// Initialize express application
const app = express();

// Set the port for the server to listen on (the env might not work)
const port = process.env.PORT || 3012;

// enable CORS
app.use(cors());

// Use bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the eventRoutes for any requests to /api
app.use('/api', eventRoutes);

// handle 404 errors (might need to be in middleware)
app.use((req, res, next) => {
    try {
        // Send a 404 Not Found response
        res.status(404).send('404 Not Found');
    } catch (err) {
        // Log any errors that occur when sending the response
        console.error('Error sending 404 response:', err);
        next(err);
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`🏀   Service is running on port ${port}`);
});