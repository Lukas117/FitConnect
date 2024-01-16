import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'variables.env' });

import indexRouter from './routes/index.js';
import cors from 'cors';

const app = express();

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.set('port', process.env.PORT || 3011);
const server = app.listen(app.get('port'), () => {
	console.log(` Express running → PORT ${server.address().port}`);
});
