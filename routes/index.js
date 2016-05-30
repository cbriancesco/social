var mongoose = require('mongoose');
var homeController = require('../controllers/home-controller');
var loginController = require('../controllers/login-controller');
var filesController = require('../controllers/files-controller');
var errors = require('./errors');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var sess;
var express = require('express');


module.exports = function (app) {

    // home page
    app.get('/', homeController.showHome);
    app.get('/dashboard', homeController.showDashboard);
    app.get('/dashboard/:id', homeController.showDashboardUser);


    // login / logout routes
    app.get('/login', function(req, res, next){res.render('login');});
    app.post('/login', loginController.login);


    // signup page
    app.get('/signup', function(req, res, next){res.render('signup');});
    app.post('/signup', loginController.signup);
    app.get('/logout', loginController.logout);


    // files
    app.post('/upload', multipartMiddleware, filesController.uploadFile);
    app.post('/upload/:id', multipartMiddleware, filesController.uploadFile2);
    app.get('/file/:id/:width/:height', filesController.getFile);


    // Message
    app.get('/message', function(req, res, next){res.render('message');});


    // error handlers
    errors(app);
}
