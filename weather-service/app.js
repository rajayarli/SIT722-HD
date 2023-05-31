  const express = require('express');
  const axios = require('axios');
  const app = express();
  const cors = require('cors');
  app.use(cors());
  app.get("/", (req, res) => {
    res.send("weather Microservice");
  });
  app.get('/weather', async (req, res) => {
    try {
      // Fetch latitude and longitude from the geolocation service
      // const geolocationAPIResponse = await axios.get('http://localhost:3001/geolocation', {
      //   params: {
      //     // Pass any required parameters to the geolocation service
      //     // If needed, you can include additional query parameters here
      //   },
      // });

      // Extract latitude and longitude from the geolocation API response
      let { latitude, longitude } = req.query;
     
      // const { latitude, longitude } = geolocationAPIResponse.data.location;
     
      // Make a request to the Open-Meteo API to fetch weather data
      const weatherAPIResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude,
          longitude,
          hourly: 'temperature_2m',
        },
      });
//console.log(weatherAPIResponse);
      // Extract the desired field from the weatherAPIResponse
      const temperature = weatherAPIResponse.data.hourly.temperature_2m[0];
console.log(weatherAPIResponse.data.hourly.temperature_2m);
      // Create a new object with the selected field
      const response = { temperature };

      res.json(response);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  const port = 3001;
  app.listen(port, () => {
    console.log('Weather service listening on port', port);
  });
