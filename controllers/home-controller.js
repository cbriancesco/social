var mongoose = require('mongoose');
var Admin = require('../models/admin');
var sess;
var conn = mongoose.connection;
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

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
    var images = [];
    var gfs = Grid(conn.db);

    gfs.files.find({}).toArray(function (err, files) {
 
        if (err) {
            res.json(err);
        }

        if (files.length > 0) {
            render(files);

        } else {
            res.json('File Not Found');
            render();
        }
    });

    function render(files){
        var data = {};

        if(files){
            data.images = files;
        }

        if(sess.email) {
            data.user = sess.email;
            res.render('dashboard', data);
        } else {
            data.nouser = 'no user';
            res.render('dashboard', data);
        }
    }
}










