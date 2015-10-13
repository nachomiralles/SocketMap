$(document).ready(function(){
    $("#connect-button").click(function(event){
        event.preventDefault();
    });

    $("#send-msg-button").click(function(event){
        event.preventDefault();
    });
});

$(window).load(function(){
    $('#myModal').modal('show');
});

$("#connect-button").on("click", function(){
    var username = $('#username').val();
    if(username){
        console.log("Contecting");
        var socket = io("/", {query: 'username=' + username });
        $('#myModal').modal('hide')

        $('#send-msg-button').click(function(){
            var text = $('#m').val();
            if(text!="") {
                socket.emit('chat message', text);
                $('#m').val('');
                return false;
            }
        });

        socket.on('user connected', function(msg){
            $('#messages').append("<li><b>" + msg + "</b></li>");
        });

        socket.on('user disconnected', function(msg){
            $('#messages').append("<li><b>" + msg + "</b></li>");
        });

        socket.on('chat message', function(msg){
            $('#messages').append($('<li>').text(msg));
        });
    }
    else{
        alert("Fill the username.")
    }

})
