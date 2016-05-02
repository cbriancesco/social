var mongoose = require('mongoose');
var User = require('../models/users');
var cleanString = require('../helpers/cleanString');
var validateEmail = require('../helpers/validate/email');


module.exports.signup = function(req, res){
    console.log(req.body);

    if(validateEmail(req.body.email)){
        console.log('email is valid');
        res.render('home', {user: req.body.email});
    } else {
        return invalid();
    }
    
    //console.log(req);

    // var newUser = req.body;
    // newUser.email = newUser.email.toLowercase();

    // var user = new User(newUser);

    // // save user to database
    // user.save(function(err, info) {
    //     if (err){ 
    //         throw err;
    //     } else {
    //         res.json({_id: info._id, email: info.email, user: info.user});
    //     }
    // });
    function invalid() {
        return res.render('signup', { invalid: true });
    }
}




module.exports.login = function (req, res){
    console.log(req.param('email'));

    //var email = cleanString(req.param('email'));
    //var user = req.body.user;
    //var pass = req.body.password;

    // fetch user and test password verification
    // User.findOne({ user: user }, function(err, user) {
    //     if (err) throw err;

    //     if(user){
    //         // test a matching password
    //         user.comparePassword(pass, function(err, isMatch) {
    //             if (err) throw err;

    //             if(isMatch){
    //                 console.log('PASSWORD MATCH');
    //                 // res.json({email: user.email,
    //                 //         id: user._id,
    //                 //         user: user.user,
    //                 //         name: user.name,
    //                 //         lastName: user.lastName,
    //                 //         fullName: user.name + ' ' + user.lastName,
    //                 //         image: user.image,
    //                 //         imageName: user.imageName,
    //                 //         verified: user.verified,
    //                 //         role: user.role});

    //                 req.session.isLoggedIn = true;
    //                 req.session.user = user.email;
    //                 res.redirect('/dashboard');

    //             } else {
    //                 console.log('PSSWORD DIDNT MATCH');
    //                 console.log(pass, isMatch); // -&gt; Password123: false
    //             }
                
    //         });
    //     } else {
    //         console.log('user not found');
    //     }
    // });
}










