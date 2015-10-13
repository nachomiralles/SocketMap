/**
 * Created by NachoGeotec on 02/10/2015.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require("mongoose");
var dbConfig = require("./controller/db.js");
var users = [];

app.use(express.static(__dirname + '/public'));

mongoose.connect(dbConfig.url, function(err, res){
    if(err) console.log ('ERROR connecting to: ' + dbConfig.url + '. ' + err);
    console.log('Connected to: ' + dbConfig.url);
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/indexMap.html');
});

io.on('connection', function(socket){
    var data = socket.handshake.query.data.split(";");
    console.log("DATA: " + data);
    var username = data[0];
    var lat = data[1];
    var lon = data[2];
    users[username] = [lat, lon];


    io.emit('user connected', username, lat, lon);

    socket.on('disconnect', function(){
        delete users[username];
        io.emit('user disconnected', username);
    });

    socket.on('position changed', function(latitiude, longitude){
        lat = latitiude;
        lon = longitude;
        users[username] = [lat, lon];
        console.log("POS CHANGED: " + username + " LAT: " + lat + " LON: " + lon);
        io.emit('update position', username, lat, lon);
    });
});

var port = 8899;

http.listen(port, function(){
    console.log('listening on port: ' + port);
});

function actualTime(){
    var date = new Date();
    var dia = date.toDateString();
    if(date.getMinutes().toString().length<2) var minutes = "0" + date.getMinutes();
    else var minutes = date.getMinutes();
    var hour = date.getHours() + ':' + minutes;
    var dateReturned = dia + " " + hour;
    return dateReturned;
}