'use strict';
//Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var compression = require('compression')
var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
var path = require('path');
var cmd = require('node-cmd');

//FIREBASE CONNECTION
var moment = require("moment");
var fireAdmin = require("firebase-admin");
fireAdmin.initializeApp({
  credential: fireAdmin.credential.cert("./server/serviceAccountKey.json"),
  databaseURL: "https://softwareofplaces.firebaseio.com"
});
var logDatabase = fireAdmin.database();
var refImage = logDatabase.ref("Base64Images");
var logImage = refImage.child("logs");

var app = express()
app.use(compression())
//app.use(express.static(__dirname + "/photo"));
app.use('/photo', express.static(path.join(__dirname, '/photo')));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('hello world')
});

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
};
//SAVE FILES
function saveFile (_callback) {
  var base64str = base64_encode(path.join(__dirname,'/photo/teste.jpg'));
  var dataObj = {
    imageBase64 : base64str
  }
  console.log('Criou arquivo base64');
  console.log(base64str.length);
  var newLogRef = logImage.push();
  newLogRef.set(dataObj, function (err) {
    console.log('Salvou no FireBase');
    //process.exit(0);
    _callback(err,base64str);
  });
};
//TAKE PICTURES
app.get('/takePicture', function (req, res) {
  cmd.get('fswebcam -r 1280x960 --no-banner ./photo/teste.jpg',
      function(data) {
        console.log('Salvou Imagem');
        //console.log(data);
        saveFile(function(_err, _data) {
          if(!err) {
            res.send('Imagem Salva no Banco').end();
          } else {
            res.send('Erro ao Salvar no Banco').end();
          }
        });
      }
  );
});
//START SERVER
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
  console.log(process.env.NODE_ENV);
});




// var v4l2camera = require("v4l2camera");
// var cam = new v4l2camera.Camera("/dev/video0");
// if (cam.configGet().formatName !== "MJPG") {
//   console.log("NOTICE: MJPG camera required");
//   process.exit(1);
// }
// cam.start();
// cam.capture(function (success) {
//   var frame = cam.frameRaw();
//   fs.createWriteStream("result.jpg").end(Buffer(frame));
//   var base64str = base64_encode("result.jpg");
//   var newLogRef = logImage.push();
//   newLogRef.set(base64str);
//   cam.stop();
// });

// var RaspiCam = require("raspicam");
// var camera = new RaspiCam({
// 	mode: "photo",
// 	output: "./photo/image.jpg",
// 	encoding: "jpg",
// 	timeout: 0 // take the picture immediately
// });
// //var filePath = path.join(__dirname, './photo/image.jpg');
// camera.on("start", function( err, timestamp ){
// 	console.log("photo started at " + timestamp );
// });
// camera.on("read", function( err, timestamp, filename ) {
//     console.log(filename);
//     var base64str = base64_encode('./photo'+filename);
//     var newLogRef = logImage.push();
//     newLogRef.set(base64str);
// });
// camera.on("exit", function( timestamp ){
// 	console.log("photo child process has exited at " + timestamp );
// });
// //camera.start();

// function solution(N) {
//     // write your code in JavaScript (Node.js 6.4.0)
//     var nBin = (N >>> 0).toString(2);
//     var size = 0;
//     var splitArray = nBin.split("1");
//     for (var i = 0; i < splitArray.length; i++) {
//         if(splitArray[i] && splitArray[i].length > 0) {
//             if(splitArray[i].length > size) {
//                 size = splitArray[i].length;
//             }
//         }
//     }
//     console.log(splitArray);
//     console.log(size);
//     process.exit(0);
// }
// solution(51712)