var socket = io();

//  Notes: for CPS490 students 
//    document.getElementById('contents'); //returns a HTML DOM Object
//    var contents = $('#contents');  //returns a jQuery Object
//    
//    To get the same result as document.getElementById ... you can use the jQuery object like this
//    var contents = $('#contents')[0]; //returns a HTML DOM Object

// -------------------------
// DOM Ready
// -------------------------
$( document ).ready(function() {
  console.log( "Document Object Model (DOM) is ready!" );

});

// -------------------------
// Event listeners
// -------------------------
socket.on("welcome", (welcomemessage) => {
    document.getElementById('messages').innerHTML += welcomemessage + "<br>";
});

socket.on("chat", (chatmessage) =>{
    document.getElementById('messages').innerHTML += chatmessage + "<br>";
})

// -------------------------
// Named Functions
// -------------------------
function login(){
  username = document.getElementById('username').value;
  if(socket) {
    socket.emit("login", username);
  }
}

function sendmessage(){
  console.log("Trying to send a message");
  socket.emit("chat" , $('#message').val());
  // These are equivalent:
  // socket.emit("chat", document.getElementById('message').value);
  // socket.emit("chat" , $('#message').val());
}
