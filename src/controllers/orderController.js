const Order = require('../models/order');

// In-memory database
const orders = [];

// Generate unique ID
const generateId = () => `ORD-${Date.now()}`;

// Place an order
const placeOrder = (req, res) => {
    const { productName, quantity, pricePerUnit } = req.body;

    // Input validation
    if (!productName || typeof quantity !== 'number' || quantity <= 0 || typeof pricePerUnit !== 'number' || pricePerUnit <= 0) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    const totalAmount = quantity * pricePerUnit;
    let discounts = 0;

    // Apply discounts
    if (totalAmount > 10000) {
        discounts += totalAmount * 0.1; // 10% discount
    }
    if (quantity > 5) {
        discounts += 500; // Flat ₹500 discount
    }

    const finalAmount = totalAmount - discounts;
    const order = new Order(
        generateId(),
        productName,
        quantity,
        pricePerUnit,
        totalAmount,
        discounts,
        finalAmount,
        new Date()
    );

    orders.push(order);
    res.status(201).json(order);
};

// Get order summary by ID
const getOrderSummary = (req, res) => {
    const { id } = req.params;
    const order = orders.find(order => order.id === id);

    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
};

// Calculate total revenue (fixing the issue of ID)
const calculateTotalRevenue = (req, res) => {
    // Check if there are any orders
    if (orders.length === 0) {
        return res.status(200).json({ totalRevenue: 0 });
    }

    // Sum up all orders' finalAmount
    const totalRevenue = orders.reduce((sum, order) => sum + order.finalAmount, 0);

    // Return the calculated total revenue
    res.status(200).json({ totalRevenue });
};

module.exports = {
    placeOrder,
    getOrderSummary,
    calculateTotalRevenue
};
