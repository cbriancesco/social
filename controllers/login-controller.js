var mongoose = require('mongoose');
var User = require('../models/users');
var cleanString = require('../helpers/cleanString');
var validateEmail = require('../helpers/validate/email');


module.exports.signup = function(req, res, next){
    console.log(req.body);

    if(validateEmail(req.body.email)){
        console.log('email is valid');
        //res.render('home', {user: req.body.email});
    } else {
        return invalid();
    }
    
    //console.log(req);

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
            //res.json({_id: info._id, email: info.email, user: info.user});
            res.render('signup', { user: info });
         }
    });


    // User.create(newUser, function (err, newUser) {
    //     if (err) {
    //         if (err instanceof mongoose.Error.ValidationError) {
    //             return invalid();
    //         } 
    //         return next(err);
    //     }

    //     // user created successfully
    //     res.render('signup', { user: info });
    // })


    function invalid() {
        return res.render('signup', { invalid: true });
    }
}




module.exports.login = function (req, res){

    //var email = cleanString(req.param('email'));
    var email = req.body.email;
    var pass = req.body.pass;

    console.log(req.body);

    // fetch user and test password verification
    User.findOne({ email: email }, function(err, user) {
         if (err) throw err;

         if(user){
            console.log('user found');

            // test a matching password
            user.comparePassword(pass, function(err, isMatch) {
                if (err) throw err;

                if(isMatch){
                    console.log('PASSWORD MATCH');
                    // res.json({email: user.email,
                    //         id: user._id,
                    //         user: user.user,
                    //         name: user.name,
                    //         lastName: user.lastName,
                    //         fullName: user.name + ' ' + user.lastName,
                    //         image: user.image,
                    //         imageName: user.imageName,
                    //         verified: user.verified,
                    //         role: user.role});

                    //req.session.isLoggedIn = true;
                    //req.session.user = user.email;
                    //res.redirect('/dashboard');

                } else {
                    console.log('PSSWORD DIDNT MATCH');
                    console.log(pass, isMatch); // -&gt; Password123: false
                }
                
            });
        } else {
            console.log('user not found');
        }
    });
}










