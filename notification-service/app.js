const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.get("/", (req, res) => {
  res.send("notification Microservice");
});
app.get('/notification', (req, res) => {
  // Handle the notification logic
  res.json({ message: 'New your weather report is generated' });
});
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});
app.listen(3003, () => {
  console.log('Notification service listening on port 3003');
});
