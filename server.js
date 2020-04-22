var serverHappyThoughts = ["Cease the day!",
  "Spring!",
  "There is beauty all around us."];

  var oldThoughts = ["death", "destruction", "decay!"]

  const Datastore = require('nedb');
  const database = new Datastore('database.db');
  var test = {};
  database.loadDatabase();
  //database.update({happyArray: serverHappyThoughts}, { $set: {happyArray: newThoughts}}, {}, function(err, numReplaced){});
  database.find({ _id: "zEDTm85QSgB8x5mu" }, function (err, docs) {
    //console.log(docs);
    serverHappyThoughts = docs[0].happyArray
    console.log(serverHappyThoughts);

  // docs is an array containing documents Mars, Earth, Jupiter
  // If no document is found, docs is equal to []
});
//console.log(test);


//import express to create the server
var express = require('express');
var app = express();

//let heroku set the port
var port = process.env.PORT || 8080;
var server = app.listen(port);


//tell the server to serve everything that is in the public folder
app.use(express.static('public'));
console.log("my socket server is running")

//import socket.io to create the socket 'io'
var socket = require('socket.io');
var io = socket(server);

//io listens for events and performs functions when it hears them
// when the 'connection' event happens, I want it perform 'newConnection
io.sockets.on('connection', newConnection);


function newConnection(socket){
  console.log('new connection: ' + socket.id);
  emitHappyThoughts();

  socket.on('happyThought', updateServerHappyThoughts)

  //Recieves happy thought from client and append it to serverHappyThoughts array
  function updateServerHappyThoughts(happyThought){
    console.log('trying id 2')
    serverHappyThoughts.push(happyThought);
    database.update({_id: "zEDTm85QSgB8x5mu"}, { $set: {happyArray: serverHappyThoughts}}, {}, function(err, numReplaced){})
    emitHappyThoughts();
  }

  function emitHappyThoughts(){
    console.log('trying...')
    io.sockets.emit('happyThoughtFrom', serverHappyThoughts)
  }

}
