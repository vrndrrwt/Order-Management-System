const express = require('express');
const { placeOrder, getOrderSummary, calculateTotalRevenue } = require('../controllers/orderController');

const router = express.Router();

// Define routes
router.get('/api/orders/revenue', calculateTotalRevenue); // Calculate total revenue
router.get('/:id', getOrderSummary); // Get order summary
router.post('/', placeOrder); // Place an order

module.exports = router;
