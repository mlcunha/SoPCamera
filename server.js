'use strict';
//Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var fs = require('fs');
var path = require('path');

//FIREBASE CONNECTION
//var moment = require("moment");
var fireAdmin = require("firebase-admin");
fireAdmin.initializeApp({
  credential: fireAdmin.credential.cert("./server/serviceAccountKey.json"),
  databaseURL: "https://softwareofplaces.firebaseio.com"
});
//var logDatabase = fireAdmin.database();
//var refInsole = logDatabase.ref("smartInsole");
//var logRef = refInsole.child("logs");

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

var storage = fireAdmin.storage();
// Create a storage reference from our storage service
var storageRef = storage.ref();
// Create a child reference
var imagesRef = storageRef.child('/photo/image.jpg');

var RaspiCam = require("raspicam");
var camera = new RaspiCam({
	mode: "photo",
	output: "./photo/image.jpg",
	encoding: "jpg",
	timeout: 0 // take the picture immediately
});
//var filePath = path.join(__dirname, './photo/image.jpg');
camera.on("start", function( err, timestamp ){
	console.log("photo started at " + timestamp );
});
camera.on("read", function( err, timestamp, filename ) {
    console.log(filename);
    var base64str = base64_encode('./photo'+filename);
    console.log("photo image captured with filename: " + filename );
    imagesRef.putString(base64str, 'base64').then(function(snapshot) {
    console.log('Uploaded a base64 string!');
    });
});
camera.on("exit", function( timestamp ){
	console.log("photo child process has exited at " + timestamp );
});
camera.start();