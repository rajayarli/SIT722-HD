const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(cors());

app.get('/geolocation', async (req, res) => {
  try {
    const ipAddress = req.ip; // Get the client's IP address from the request object
    console.log(ipAddress);
    // Make a request to the ipapi geolocation service to get the latitude and longitude
    const geolocationAPIResponse = await axios.get(`https://ipapi.co/${ipAddress}/json/`);

    // Extract the latitude and longitude from the geolocation API response
    const { latitude, longitude } = geolocationAPIResponse.data;

    res.json({ location: { latitude, longitude } });
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const port = 3002;
app.listen(port, () => {
  console.log('Geo-Service listening on port', port);
});
