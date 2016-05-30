var mongoose = require('mongoose');

module.exports = mongoose.model('Admin', {
    roles: {
        name: {type: String, required: true}, 
        canSee: Array,
        canEdit: Array
    },
    companyName: {type: String, required: true},
    logo: String,
    image: String,
    currency: String,
    sucursals: Array,
    groups: Array,
    socialMedia: Array,
    productCategories: Array,
    assetCategories: Array,
    employees: Array,
    users: Array
});