/**
 * Created by NachoGeotec on 02/10/2015.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
    var username = socket.handshake.query.username;
    io.emit('user connected', username + " connected.");
    socket.on('disconnect', function(){
        io.emit('user disconnected', username + " disconnected.");
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', username + ' (' + actualTime() + '): ' + msg);
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