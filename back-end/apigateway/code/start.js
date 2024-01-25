import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import indexRouter from './routes/index.js';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);



app.set('port', process.env.PORT);
const server = app.listen(app.get('port'), () => {
	console.log(`🏀 service is running on port ${server.address().port}`);
});
