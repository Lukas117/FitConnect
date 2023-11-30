const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: 'variables.env' });
const indexRouter = require('./routes/userRoutes.js');
const { ErrorHandler } = require('./middleware/errorHandler.js');
const cors = require('cors');
const { authenticate } = require('./middleware/authenticate.js');



const app = express();
app.use(cors());

// support json encoded and url-encoded bodies, mainly used for post and update
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', indexRouter);

app.use((req, res, next) => {
	try {
		// set header before response
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