'use strict';

const fs = require('fs');
const request = require('request');
const download = require('image-downloader');
var jimp = require('jimp');

exports.returnThumbnail = (req,res)=>{
  const options = {
    url: req.body.imageUrl,
    dest: './controllers/images/photo.png'
  }
  download.image(options)
  .then(({ filename, image }) => {
    jimp.read("./controllers/images/photo.png", function (err, photo) {
        if (err)
          res.json({msg:"Some error occoured",err:err});
        photo.resize(50, 50)                           // resize
         //.quality(60)                               // set JPEG quality
         //.greyscale()                               // set greyscale
         .write("./controllers/images/photo1.jpg");   // save
         fs.readFile(__dirname+'/images/photo1.jpg', function (err, content) {
         if (err) {
             res.writeHead(400, {'Content-type':'text/html'})
             res.end("No such image");
         } else {
             res.writeHead(200,{'Content-type':'image/jpg'});
             res.end(content);
         }
       });
    });
  }).catch((err) => {
     res.json({message : "Please enter a valid imageUrl"});
  });
}
