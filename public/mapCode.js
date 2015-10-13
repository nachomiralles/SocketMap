/**
 * Created by NachoGeotec on 06/10/2015.
 */
var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var username = null;
var lat = null;
var lon = null;
var socket = null;
var users = [];

function sendPosition(latitude, longitude){
    lat = latitude;
    lon = longitude;
    socket.emit('position changed', lat, lon);
}

function updateMarker(marker, latitude, longitude){

}

function updatePositions(){

}

$(window).load(function(){
    $('#myModal').modal('show');
});

$(document).ready(function(){
    $("#connect-button").click(function(event){
        event.preventDefault();
    });
});

$("#connect-button").on("click", function(){
    username = $('#username').val();

    if(username){

        if ("geolocation" in navigator) {
            var watchID = navigator.geolocation.watchPosition(function(position) {

                if(socket==null) {
                    lat = position.coords.latitude;
                    lon = position.coords.longitude;
                    socket = io("/", {query: 'data=' + username + ';' + position.coords.latitude + ';' + position.coords.longitude});
                    socket.on('user connected', function(username, lat, lon, serverUsers){
                        //DRAW NEW USER
                        users[username] = [lat, lon];
                       // var usersSend = convertUsersToJSON();
                        console.log(username + " " + users[username]);
                    });

                    socket.on('user disconnected', function(username){
                        //REMOVE DISCONECTED USER
                        delete users[username];
                        console.log("USERNAME: " + username + " DISCONECTED");
                    });

                    socket.on('update position', function(username, lat, lon){
                        //MOVE USER POSITION
                        users['username'] = [lat, lon];
                        console.log(username + " " + users[username]);
                    });

                }
                sendPosition(position.coords.latitude, position.coords.longitude);
            });
        } else {
            throw new Error("geolocaiton IS NOT available");
        }
        $('#myModal').modal('hide')


    }
    else{
        alert("Fill the username.")
    }

})