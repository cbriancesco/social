var mongoose = require('mongoose');

module.exports = mongoose.model('Group', {
    name: {type: String, required: true},
    members: Array,
    schedule: Object
});