var express = require('express')
var app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

// You should create a public directory in your project folder and
// place all your static files there and the below app.use() will
// serve all files and sub-directories contained within it.
app.use('/static', express.static('public'));

app.get('/', (request, response) => {
  console.log("Got an HTTP request")  
  response.sendFile(__dirname+'/index.html')
})

io.on("connection", (socketclient) => {
    console.log("A new Socket.io client is connected. ID= " + socketclient.id);

    // Event Listeners
    socketclient.on("login", (username) => {
        socketclient.username = username;
        var welcomemessage = username + " has joined the chat!";
        console.log(welcomemessage);
        socketclient.emit("welcome", welcomemessage);    
    });
    socketclient.on("chat", (message) => {
        var chatmessage = socketclient.username + ": " + message;
        console.log(chatmessage); 
        io.emit("chat", chatmessage); 
    });

    // Code for the chat Listener 
});

const port = process.env.PORT || 8080
var server = http.listen(port, () => {
    console.log(`App listening on port ${server.address().port}`)
});
