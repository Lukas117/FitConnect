// start.js setup from learnnode.com by Wes Bos
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });
import indexRouter from './routes/index.js';
import { ErrorHandler } from './middleware/errorHandler.js';
import cors from 'cors';
import { authenticate } from './middleware/authenticate.js';

const app = express();
app.use(cors());

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authenticate);
app.use('/', indexRouter);
app.use('/users', indexRouter);

app.use((req, res, next) => {
	try {
		//set header before response
		res.status(404).send("Sorry can't find that!");
	} catch (err) {
		next(err);
	}
});
app.use(ErrorHandler);

app.set('port', process.env.PORT || 3010);
const server = app.listen(app.get('port'), () => {
	console.log(`🍿 Express running → PORT ${server.address().port}`);
});
