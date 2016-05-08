var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var conn = mongoose.connection;
var fs = require('fs');
var Grid = require('gridfs-stream');


Grid.mongo = mongoose.mongo;



var fileName = 'sample.png';

module.exports.uploadFile = function(req, res){
    var gfs = Grid(conn.db);

    console.log('THIS IS THE FILES DATA');
    //{fileName: <string>, userId: <string>}
    console.log(req.body || fileName);
 
    var writestream = gfs.createWriteStream({
        filename: fileName
    });

    fs.createReadStream('uploads/' + fileName).pipe(writestream);
 
    writestream.on('close', function (file) {
        console.log('CREATED FILE');
        console.log(file);
        //res.json({fileId: file._id, userId: req.body.userId, fileName: file.filename || fileName})
        // do something with `file`
        console.log(file.filename + ' Written To DB');

    });
    res.render('home');

}

module.exports.getFile = function(req, res){
    var gfs = Grid(conn.db);
    
    console.log('files');
    console.log(req.params);

    var imageid = req.params.id.toString();
    var pic_id = mongoose.Types.ObjectId(imageid);

    gfs.files.find({_id: pic_id}).toArray(function (err, files) {
 
        if (err) {
            res.json(err);
        }

        console.log(files);

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

// app.get('/image/:id/:width/:height/:filename', function(req, res, next) {
//         Asset.findById(req.params.id, function(err, doc) {
//              if (err || !doc) return next();
//              gridfs.get(doc.files[0]._id.toString(), function (err, file) {
//                 if (err) throw new Error('unable to find grid asset');
//                 if (doc.filename.indexOf('.gif') >= 0) {
//                     file.stream(true).pipe(res);
//                 } else {
//                     gm(file.stream(true))
//                         .resize(req.params.width, req.params.height)
//                         .noProfile()
//                         .quality(constants.ASSETS.IMAGES_DEFAULT_QUALITY)
//                         .interlace(constants.INTERLACE)
//                         .stream(function (err, stdout, stderr) {
//                             stdout.pipe(res);
//                         });
//                 }
//              });
//          });
//     });















 










