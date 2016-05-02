var mongoose = require('mongoose');
//var errors = require('./errors');
var home = require('./home');
var login = require('./login');

module.exports = function (app) {

  // home page
  home(app);

  // login / logout routes
  login(app);

  // error handlers
  //errors(app);
}
