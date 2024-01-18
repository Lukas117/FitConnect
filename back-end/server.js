// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 6000; // Change the port if needed

app.use(bodyParser.json());

app.post('/hardwaretest', (req, res) => {
 try {
    const lightStatus = req.body.light_status;

    // You can process the data here if needed

    console.log('Received from Raspberry Pi:', lightStatus);
    res.status(200).send('Data received successfully.');
  } catch (error) {
    console.error('Error processing data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
