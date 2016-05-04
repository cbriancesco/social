var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    middleware = require('./middleware'),
    routes = require('./routes');
    port = 4001;


mongoose.connect('mongodb://localhost:27017/wolfaide3');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.set('views', __dirname + '/views/pages');
app.use('/app', express.static(__dirname + '/app'));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/files', express.static(__dirname + "/files"));

// middleware
//middleware(app);

// set of routes
routes(app, mongoose);

app.listen(port, function(){
    console.log('listening for localhost:' + port);
});