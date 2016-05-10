var mongoose = require('mongoose');
var User = require('../models/users');
var cleanString = require('../helpers/cleanString');
var validateEmail = require('../helpers/validate/email');
var sess;

module.exports.signup = function(req, res, next){
    console.log(req.body);

    if(validateEmail(req.body.email)){
        console.log('email is valid');
        //res.render('home', {user: req.body.email});
    } else {
        return invalid();
    }

    var newUser = req.body;
    newUser.email = newUser.email.toLowerCase();
    newUser.name = {first: req.body.first, last: req.body.last};
    newUser.password = req.body.pass;

    var user = new User(newUser);

    // save user to database
    user.save(function(err, info) {
        if (err){ 
            throw err;
        } else {
            res.render('signup', { user: info });
        }
    });

    function invalid() {
        return res.render('signup', { invalid: true });
    }
}




module.exports.login = function (req, res){
    var email = req.body.email;
    var pass = req.body.pass;

    // fetch user and test password verification
    User.findOne({ email: email }, function(err, user) {
         if (err) throw err;

         if(user){

            // test a matching password
            user.comparePassword(pass, function(err, isMatch) {
                if (err) throw err;

                if(isMatch){
                    sess = req.session;
                    sess.email = user.email;
                    sess.name = user.name;
                    sess.userid = user._id;
                    sess.image = user.image;

                    // redirect to dashboard
                    res.writeHead(301, {
                        Location: '/dashboard'
                    });
                    res.end();

                } else {
                    return invalid();
                }
                
            });
        } else {
            console.log('user not found');
        }
    });

    function invalid() {
        return res.render('login', { invalid: true });
    }
}


module.exports.logout = function (req, res){
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
}





