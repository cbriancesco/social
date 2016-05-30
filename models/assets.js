var mongoose = require('mongoose');

module.exports = mongoose.model('Asset', {
    name: {type: String, required: true},
    keywords: Array,
    category: String,
    image: String,
    color: String,
    size: String,
    quantity: Number,
    entry: Date,
    expiration: Date,
    price: String,
    code: {type: String, index: {unique: true}}
    assignedTo: String, 
    new: Boolean,
    notes: String
});