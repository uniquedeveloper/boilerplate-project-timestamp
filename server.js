const express = require('express');
const moment = require('moment'); // Optional, for easier date parsing and formatting
const app = express();
const port = process.env.PORT || 3000;

// Function to format dates
const formatDate = (date) => {
  const unixTime = date.getTime();
  const utcTime = date.toUTCString();
  return {
    unix: unixTime,
    utc: utcTime,
  };
};

// API route to handle both valid and invalid dates
app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  // If no date is provided, use current date and time
  if (!date) {
    const currentDate = new Date();
    return res.json(formatDate(currentDate));
  }

  let parsedDate;

  // Check if the date is a number (Unix timestamp)
  if (!isNaN(date)) {
    parsedDate = new Date(parseInt(date));
  } else {
    // Try parsing the date using Date object
    parsedDate = new Date(date);
  }

  // If parsedDate is invalid
  if (parsedDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return formatted date object
  res.json(formatDate(parsedDate));
});

// Serve static files (for frontend, if you plan to use a frontend interface)
app.use(express.static('public'));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
