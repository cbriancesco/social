var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var conn = mongoose.connection;
var fs = require('fs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var sess;
var User = require('../models/users');
var easyzip = require('easy-zip');
var EasyZip = require('easy-zip').EasyZip;
var request = require('request');
var sess;


module.exports.uploadFile = function(req, res){
    var gfs = Grid(conn.db);

    var filePath = req.files.image.path;
    var fileName = req.files.image.name;
    var newFile;
 
    var writestream = gfs.createWriteStream({
        filename: fileName
    });

    fs.createReadStream(filePath).pipe(writestream);
 
    writestream.on('close', function (file) {
        res.render('dashboard', {image: {_id: file._id, name: file.imagename}});
    });
    
}


module.exports.uploadFile2 = function(req, res){
    sess = req.session;
    var gfs = Grid(conn.db);

    // Gets path of the file
    var filePath = req.files.image.path;
    // Gets name and extension of the file
    var fileName = req.files.image.name;
    var newFile;
 
    // adds the name of the file to the set 
    var writestream = gfs.createWriteStream({
        filename: fileName
    });

    // creates the data of the file with the path
    fs.createReadStream(filePath).pipe(writestream);
 
    writestream.on('close', function (file) {
        console.log('file next');
        console.log(file);
        console.log('Sess');
        console.log(sess.image._id ? true : false);
        
        if(req.params && req.params.id && req.params.id === sess.userid){
            if (sess.image._id){
                removePrevImage(sess.image._id, sess.userid, file, updateUserImage)
            } else {
                console.log('this is step 1');
                console.log(file);
                updateUserImage(sess.userid, file);
            }
            
        } else {
            res.render('dashboard', {error: "woooops! that didn't work.."});
        }
        
    });

    function removePrevImage(iid, uid, image, cb){
        var gfs = Grid(conn.db);

        gfs.remove({_id : iid}, function (err) {
            if (err) {
                return handleError(err);
            } else {
                cb(uid, image);
            }
        });
    }

    function updateUserImage(uid, image){
        console.log('this is step 2');
        console.log(image);
        var query = {_id: uid};
        var set = {image: {_id: image._id, name: image.filename}};
        var options = {};

        User.update(query, { $set: set}, options, function(err, results){
            if (err){
                res.redirect('/dashboard', {error: "well.. that didn't work.."});
            } else {
                sess.image = image;
                sess.image.name = image.filename;
                res.writeHead(301, {
                    Location: '/dashboard'
                });
                res.end();
            }
        });
    }

}



module.exports.getFile = function(req, res){
    var gfs = Grid(conn.db);

    var imageid = req.params.id.toString();
    var pic_id = mongoose.Types.ObjectId(imageid);

    gfs.files.find({_id: pic_id}).toArray(function (err, files) {
 
        if (err) {
            res.json(err);
        }

        if (files.length > 0) {
            var mime = files[0].contentType;
            res.set('Content-Type', mime);
            var read_stream = gfs.createReadStream({_id: pic_id});
            
            read_stream.pipe(res);
            
        } else {
            res.json('File Not Found');
        }
    });
}

module.exports.downloadZip = function(req, res){
    var gfs = Grid(conn.db);
    var zip4 = new EasyZip();
    
    // base files
    var files = [
        {source: 'assets/img/sample0.png', target:'img/sample0.png'},
        //{source: 'assets/img/wolfaide.png', target:'img/wolfaide.png'},
        {source: 'assets/js/file.js', target:'js/file.js'}
    ];

    sess = req.session;
    var filesList = [sess.image._id];

    for(var i = 0, max = filesList.length; i < max; i += 1){
        if(i === (max - 1)){
            getImage(filesList[i], true);
        } else {
            getImage(filesList[i]);
        }
    }

    function getImage(image, last){
        gfs.findOne({ _id: image }, function (err, file) {
            if (err) {
                return res.status(400).send(err);
            }















            //var name = req.params.name;
            // var readStream = gfs.createReadStream({
            //     _id: image
            // });
            //res.header({'Content-type': mime.lookup(name)});
            //readStream.pipe(res);

            //zip4.file('img/' + file.filename, readStream);

            // readStream.on('close', function () {
            //     //var node = {source: filePath, target:'img/' + file.filename};
            //     //var node = {source: 'assets/img/caleb.png', target:'img/caleb.png'};

            //     //files.push(node);
                
            //     if(last){
            //         getFiles();
            //     }
            // });



            var filePath = 'assets/img/' + file.filename;
            var fs_write_stream = fs.createWriteStream(filePath);
             
            //read from mongodb
            var readstream = gfs.createReadStream({
                 _id: image
            });

            readstream.pipe(fs_write_stream);

            fs_write_stream.on('close', function () {
                var node = {source: filePath, target:'img/' + file.filename};
                //var node = {source: 'assets/img/caleb.png', target:'img/caleb.png'};

                files.push(node);
                
                if(last){
                    setTimeout(function() {
                        getFiles();
                    }, 8000);
                }
            });




        });
    }

    function getFiles(){
        var data = '<html><body><h1>Inside new Html</h1></body></html>';
        zip4.file('index.html',data);
        
        zip4.file('js/app.js','alert("hello world")');

        zip4.batchAdd(files, function(){
            //console.log('ADDING FILES');
            sendZip();
        });

        //sendZip();
    }
    
    function sendZip(){
        console.log(files);
        zip4.writeToResponse(res,'animator-product-4');
        res.end();
    }
}

module.exports.downloadZip2 = function(req, res){
    //console.log(req.body);
    //res.render('home', {file: true});
    //res.send(req.body);
    //res.render('home', {file: true});

    var data = '<html><body><h1>Inside new Html</h1></body></html>';
    var zip = new easyzip.EasyZip();
    var jsFolder = zip.folder('data');
    jsFolder.file('js/app.js','alert("hello world")');
    jsFolder.file('index.html',data);
    zip.writeToResponse(res, req.body.name);
    res.end();
}






















