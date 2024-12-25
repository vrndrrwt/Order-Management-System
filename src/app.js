const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orders'); // Import your order routes

const app = express();
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Order Management System API');
});

// Order routes
app.use('/api/orders', orderRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
