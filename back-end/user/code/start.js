import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import indexRouter from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authenticate } from './middleware/authenticate.js';
import cors from 'cors';



const app = express();
app.use(cors());

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.use((req, res, next) => {
	try {
		// set header before response
		res.status(404).send("Sorry can't find that!");
	} catch (err) {
		next(err);
	}
});
app.use(errorHandler);

app.set('port', process.env.PORT);
const server = app.listen(app.get('port'), () => {
	console.log(`🍿 Express running → PORT ${server.address().port}`);
});