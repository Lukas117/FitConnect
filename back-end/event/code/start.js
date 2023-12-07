import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router as eventRoutes } from './routes/eventRoutes.js'; // Update the import statement

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
//api route is localhost:port/api/events/:eventID
app.use('/api', eventRoutes);

app.use((req, res, next) => {
  try {
    // set header before response
    res.status(404).send("404 Not Found");
  } catch (err) {
    next(err);
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
