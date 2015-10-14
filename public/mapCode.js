/**
 * Created by NachoGeotec on 06/10/2015.
 */


var username = null;
var lat = null;
var lon = null;
var socket = null;
var users = [];
var centered = false;
var myMarker = null;


function sendPosition(latitude, longitude){
        lat = latitude;
        lon = longitude;
        socket.emit('position changed', lat, lon);
    }

function centerMap(latitude, longitude){

    map = L.map('map').setView([latitude, longitude], 10);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    showMyMarker(latitude, longitude);
    centered = true;
    //map.panTo(new L.LatLng(latitude, longitude));
}

function showMyMarker(latitude, longitude){
    myMarker = L.Marker.movingMarker([[latitude, longitude],[latitude, longitude]], [1000])
        .bindLabel(username, { noHide: true })
        .addTo(map);
   // myMarker.bindPopup(username);
   // myMarker.bindLabel("NACHO", { noHide: true });
}

function updateMarker(marker, latitude, longitude){

}

function updatePositions(){

}

function moveRandomMarker(latitude, longitude){
    if(Math.floor((Math.random() * 10) + 1)<5)
        moveMyMarker(40,-0.1);
    else moveMyMarker(latitude, longitude);
}

function moveMyMarker(latitude, longitude){
    var newLatLng = new L.LatLng(latitude, longitude);
    myMarker.moveTo(newLatLng, 1000);
    //myMarker.setLatLng(newLatLng).update();
    map.panTo(newLatLng);
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

                lat = position.coords.latitude;
                lon = position.coords.longitude;
                if(!centered) centerMap(lat, lon);
                moveRandomMarker(lat, lon);
                if(socket==null) {
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