import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router as eventRoutes } from './routes/eventRoutes.js';

const app = express();
const port = process.env.PORT || 3012;

app.use(cors());

app.use(bodyParser.json());

app.use('/api', eventRoutes);

app.use((req, res, next) => {
	try {
		res.status(404).send('404 Not Found');
	} catch (err) {
		console.error('Error sending 404 response:', err);
		next(err);
	}
});

app.listen(port, () => {
	console.log(`🏀   Service is running on port ${port}`);
});
