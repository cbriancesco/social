var mongoose = require('mongoose');
var Admin = require('../models/admin');
var sess;

module.exports.showHome = function(req, res){
    sess = req.session;

    if(sess.email) {
        res.render('home', {data: 'User is in', user: sess.email});
    } else {
        res.render('home', {data: 'No user logged in'});
    }
}

module.exports.showDashboard = function(req, res){
    sess = req.session;

    if(sess.email) {
        res.render('dashboard', {user: sess.email});
    } else {
        res.render('/');
    }
}










