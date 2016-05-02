var mongoose = require('mongoose');
var loginController = require('../controllers/login-controller');

module.exports = function (app) {
    // login page
    app.get('/login', function(req, res, next){
        res.render('login');
    });

    app.post('/login', loginController.login);


    // signup page
    app.get('/signup', function(req, res, next){
        res.render('signup');
    });

    app.post('/signup', loginController.signup);


    app.get('/logout', function (req, res) {
        req.session.isLoggedIn = false;
        req.session.user = null;
        res.redirect('/');
    })
    
}
