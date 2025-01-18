const express = require('express');
const moment = require('moment');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (e.g., index.html)
app.use(express.static('public'));

// API Route for current timestamp
app.get('/api', (req, res) => {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  const unixTimestamp = moment().unix();

  res.json({
    unix: unixTimestamp,
    utc: timestamp,
  });
});

// API Route for timestamp with date input
app.get('/api/:date_string', (req, res) => {
  const dateString = req.params.date_string;

  // Try parsing as Unix timestamp first
  let date;
  
  // Check if it's a valid Unix timestamp (integer or string)
  if (/^\d+$/.test(dateString)) {
    date = moment.unix(dateString);
  } else {
    // Try parsing as a natural date string (e.g., "December 25, 2015")
    date = moment(dateString, ["YYYY-MM-DD", "MMMM D, YYYY", "X"], true); // Added multiple formats for flexibility
  }

  if (date.isValid()) {
    res.json({
      unix: date.unix(),
      utc: date.format('YYYY-MM-DD HH:mm:ss'),
    });
  } else {
    res.json({ error: 'Invalid Date' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
