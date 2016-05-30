var mongoose = require('mongoose');

module.exports = mongoose.model('Sucursal', {
    name: {type: String, required: true},
    address: String,
    phone: Array,
    manager: String,
    groups: Array
});