const express = require('express');
const axios = require('axios');
const app = express();
const port = 4000;
app.use(express.static("frontend"));
app.use(express.urlencoded({ extended: false }));
const cors = require('cors');
app.use(cors());

app.get('/weather', async (req, res) => {
  try {
    let { latitude, longitude } = req.query;

    // Check if latitude or longitude is null
    if (!latitude || !longitude) {
      // return res.status(400).json({ error: 'Latitude and longitude are required' });
      data  = await axios.get('http://34.127.27.42/geolocation')
      latitude = data.location.latitude;
      longitude = data.location.latitude;
    }
    
    // Make a request to the weather service to get weather data
    const weatherServiceResponse = await axios.get('http://34.82.175.246/weather', {
      params: { latitude, longitude }
    });

    // Extract the weather data from the weatherServiceResponse
    const weatherData = weatherServiceResponse.data;

    res.json({ success: true, weatherData });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/access-geoservice', async (req, res) => {
  try {
    const geoServiceResponse = await axios.get('http://34.82.175.246/');
    const location = geoServiceResponse.data.location;

    res.json({ success: true, location });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/access-notificationservice', async (req, res) => {
  try {
    const notificationServiceResponse = await axios.get('http://34.82.120.7/');
    const message = notificationServiceResponse.data.message;

    res.json({ success: true, message });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/access-userservice', async (req, res) => {
  try {
    const userServiceResponse = await axios.get('http://34.82.16.12/');
    const userServiceMessage = userServiceResponse.data;

    res.json({ success: true, userServiceMessage });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Gateway application listening on port ${port}`);
});
