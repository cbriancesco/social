var express = require('express'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    app = express(),
    routes = require('./routes'),
    port = 4000;

mongoose.connect('mongodb://localhost:27017/wolfaide');

app.use(session({secret: 'building Coffee Games', 
    saveUninitialized: true,
    resave: true,
    cookie:{maxAge: Date.now() + (1 * 86400 * 1000)}
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(multer({dest: './uploads/'}));

app.set('view engine', 'jade');
app.set('views', __dirname + '/src/views/pages');
app.use('/public', express.static(__dirname + '/public'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/node_modules', express.static(__dirname + "/node_modules"));

// set of routes
routes(app);

app.listen(port, function(){
    console.log('listening for localhost:' + port);
});