var mongoose = require('mongoose');
var Admin = require('../models/admin');
var User = require('../models/users');
var sess;
var conn = mongoose.connection;
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

module.exports.showHome = function(req, res){
    sess = req.session;

    if(sess.email) {
        res.render('home', {data: 'User is in', user: sess});
    } else {
        res.render('home', {data: 'No user logged in'});
    }
}

module.exports.showDashboard = function(req, res){
    sess = req.session;
    
    if(sess.email) {
        res.render('dashboard', {user: sess});
    } else {
        res.render('message', {error: 'Sorry you need to log in first :)'});
    }
}


module.exports.showDashboardUser = function(req, res){
    sess = req.session;
    var query = req.params.id;

    User.findById(query, function (err, results){
        if (err){
            console.log("Error Out");
        } else {
            if(results){
                var userData = {
                    email: results.email,
                    id: results._id,
                    name: results.name,
                    image: results.image
                };

                if(sess.email === results.email) {
                    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> IT IS HERE');
                    res.redirect('dashboard', {user: userData});
                } else {
                    res.redirect('message', {error: 'Sorry you are not allowed to see this.'});
                }
            }
        }
    });

    // if(sess.email) {
    //     res.render('dashboard', {user: sess});
    // } else {
    //     res.render('message', {error: 'Sorry you need to log in first :)'});
    // }
}








// module.exports.showDashboard = function(req, res){
//     sess = req.session;
//     var images = [];
//     var gfs = Grid(conn.db);

//     gfs.files.find({}).toArray(function (err, files) {
 
//         if (err) {
//             res.json(err);
//         }

//         if (files.length > 0) {
//             render(files);

//         } else {
//             //res.json('File Not Found');
//             render();
//         }
//     });

//     function render(files){
//         var data = {};
        
//         if(files){
//             data.images = files;
//         }

//         if(sess.email) {
//             res.render('dashboard', {user: sess});
//         } else {
//             res.render('message', {error: 'Sorry you need to log in first :)'});
//         }
//     }
// }










