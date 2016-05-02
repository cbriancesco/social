var mongoose = require('mongoose');

module.exports = function (app) {
    // home page
    app.get('/', function(req, res, next){
        res.render('home', {data: 'hello caleb, this works'});
    });
}
