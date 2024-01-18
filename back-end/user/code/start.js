import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import indexRouter from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import cors from 'cors';

const app = express();
app.use(cors(
	{
		origin: process.env.CLIENT_URL,
		credentials: true
	}
));

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.use((req, res, next) => {
	try {
		res.status(404).send("Sorry can't find that!");
	} catch (err) {
		next(err);
	}
});
app.use(errorHandler);

app.set('port', process.env.PORT);
const server = app.listen(app.get('port'), () => {
	console.log(`🏀 Express is running on PORT ${server.address().port}`);
});
