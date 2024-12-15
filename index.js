let express = require("express");
let socket = require('socket.io');
// App setup
let app = express();

// Server setup
let server = app.listen(4000, () => {
    console.log("Project is running on localhost:4000");
});

// Route setup
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Use __dirname instead of __dir
});

//socket setup
let io=socket(server);
io.on('connection',(socket)=>{
    socket.on("chat",(data) => {
        io.sockets.emit("chat",data);
    });

    socket.on("typing",(name) => {
        //io.sockets.emit("chat",data);
       socket.broadcast.emit("typing", name);
    });
});