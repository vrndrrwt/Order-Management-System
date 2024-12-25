class Order {
    constructor(id, productName, quantity, pricePerUnit, totalAmount, discounts, finalAmount, timestamp) {
        this.id = id;
        this.productName = productName;
        this.quantity = quantity;
        this.pricePerUnit = pricePerUnit;
        this.totalAmount = totalAmount;
        this.discounts = discounts;
        this.finalAmount = finalAmount;
        this.timestamp = timestamp;
    }
}

module.exports = Order;
