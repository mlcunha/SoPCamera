'use strict';
//Set default node environment to development
//&& apt-get install ntp && apt-get install ntpdate && sudo service ntp stop ; sudo ntpdate -s ntp.inf.puc-rio.br; sudo service ntp start
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var compression = require('compression')
var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var fs = require('fs');
var path = require('path');
var cmd = require('node-cmd');

//FIREBASE CONNECTION
var moment = require("moment");
var fireAdmin = require("firebase-admin");

var app = express();
app.use(cors());
app.use(compression());
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
function saveFile (logImage,_callback) {
  var base64str = base64_encode(path.join(__dirname,'/photo/teste.jpg'));
  var dataObj = {
    imageBase64 : base64str
  }
  //console.log('Criou arquivo base64');
  //console.log(base64str.length);
  var newLogRef = logImage.push();
  newLogRef.set(dataObj, function(error) {
    _callback(error, base64str);
  });
};
//TAKE PICTURES
app.get('/takePicture', function (req, res) {
  //fireAdmin.database.enableLogging(true);
  fireAdmin.initializeApp({
    credential: fireAdmin.credential.cert('./server/serviceAccountKey.json'),
    databaseURL: "https://softwareofplaces.firebaseio.com"
  });
  var logDatabase = fireAdmin.database();
  var refImage = logDatabase.ref("Base64Images");
  var logImage = refImage.child("logs");
  cmd.get('fswebcam -r 1280x960 --no-banner ./photo/teste.jpg',
      function(data) {
        //console.log('Salvou Imagem');
        //console.log(data);
        saveFile(logImage,function(_err, _base64str) {
          if(!_err) {
            res.json({"data":_base64str}).end();
          } else {
            console.log(_err);
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