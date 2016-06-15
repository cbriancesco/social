var mongoose = require('mongoose');

module.exports = mongoose.model('Order', {
    // [{product: String, price: String, discount: String, quantity: Number}]
    products: Array,
    user: String,
    state: String,
    total: String,
    signup: { type: Date, default: Date.now },
    payment_id: String
});