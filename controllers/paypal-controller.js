var mongoose = require('mongoose');
var Admin = require('../models/admin');
var User = require('../models/users');
var sess;
var paypal = require('paypal-rest-sdk');

paypal.configure({
    "host" : "api.sandbox.paypal.com",
    "mode": 'sandbox', //sandbox or live
    "client_id" : "AT2XRnTx7JX9fIfzQArp3K9MrLmGy4MrBJA9qCkrb7wIqSaP7hkPh-c0-ZBS-OqkIu74DqSBNCP_ylGz",
    "client_secret" : "EN9guQb3wT1UI7zNPG7wApar4nn7ThWgUK378KrhZgijlzBUjF0Q6InvxKqZszwDY_z_n__aBw52Vf38",
    "sandbox-account": "jcaleb4-facilitator@hotmail.com"
});


module.exports.showCart = function(req, res){
    sess = req.session;

    if(sess.email) {
        res.render('cart', {data: 'User is in', user: sess});
    } else {
        res.render('cart', {data: 'No user logged in'});
    }
}

























