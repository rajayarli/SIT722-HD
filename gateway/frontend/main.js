// async function getWeather(latitude, longitude) {
//   try {
//     const response = await fetch(`http://localhost:4000/weather?latitude=${latitude}&longitude=${longitude}`);
//     if (!response.ok) {
//       throw new Error('Request failed');
//     }

//     const data = await response.json();
//     const { weatherData } = data;
//     const { temperature } = weatherData;

//     // Display the weather data on the page
//     const weatherContainer = document.getElementById('weather-container');
//     weatherContainer.innerHTML = `Temperature: ${temperature}°C`;
//   } catch (error) {
//     console.error(error);
//     // Handle the error appropriately
//   }
// }
window.addEventListener('DOMContentLoaded', async () => {
  try {
    // Retrieve user's geo coordinates
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;

    // Make a request to the backend to fetch weather information
    const weatherData = await fetchWeatherData(latitude, longitude);

    // Display weather information on the page
    displayWeather(weatherData);
  } catch (error) {
    console.error('Error:', error);
  }
});

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function fetchWeatherData(latitude, longitude) {
  const response = await fetch(`/weather?latitude=${latitude}&longitude=${longitude}`);
  const data = await response.json();
  return data.weatherData;
}

function displayWeather(weatherData) {
  const weatherContainer = document.getElementById('weather-container');
  weatherContainer.innerHTML = `
    <h2>Current Weather:</h2>
    <h1>Temperature: ${weatherData.temperature}°C</h1>
   
  `;
}

