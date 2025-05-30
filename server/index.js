const express = require('express');
const app = express();
const PORT = 3001;

// Test route
app.get('/', (req, res) => {
  res.send('Backend is working');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
