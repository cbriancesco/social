var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var conn = mongoose.connection;
var fs = require('fs');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var sess;
var User = require('../models/users');

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
        res.render('dashboard', {image: file._id});
    });
    
}


module.exports.uploadFile2 = function(req, res){
    sess = req.session;
    var gfs = Grid(conn.db);

    var filePath = req.files.image.path;
    var fileName = req.files.image.name;
    var newFile;
 
    var writestream = gfs.createWriteStream({
        filename: fileName
    });

    fs.createReadStream(filePath).pipe(writestream);
 
    writestream.on('close', function (file) {
        
        if(req.params && req.params.id && req.params.id === sess.userid){
            if (sess.image){
                removePrevImage(sess.image, updateUserImage, sess.userid, file._id)
            } else {
                updateUserImage(sess.userid, file._id);
            }
            
        } else {
            res.render('dashboard', {error: "woooops! that didn't work.."});
        }
        
    });

    function removePrevImage(iid, cb, uid, niid){
        var gfs = Grid(conn.db);

        gfs.remove({_id : iid}, function (err) {
            if (err) {
                return handleError(err);
            } else {
                cb(uid, niid);
            }
        });
    }

    function updateUserImage(uid, iid){

        var query = {_id: uid};
        var set = {image: iid.toString()};
        var options = {};

        User.update(query, { $set: set}, options, function(err, results){
            if (err){
                res.redirect('/dashboard', {error: "well.. that didn't work.."});
            } else {
                sess.image = iid;
                
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

