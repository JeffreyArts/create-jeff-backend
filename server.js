const { config } = require('dotenv');
config();

const express = require('express');
const app = express();
const httpServer = require("http").createServer(app);
const { Server } = require("socket.io");

let CORS = process.env.CORS;
if (process.env.CORS !== "*") {
    CORS = process.env.CORS.split(",").map(url => {
        if (url == '*') {
            return url;
        }
        return `http://${url.trim()},https://${url.trim()}`
    
    })
}

const io = new Server(httpServer, {
  cors: {
    origin: CORS,
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
    console.log("Succesfull socket connection:",socket.id); // ojIckSD2jqNzOqIrAGzL
});

app.use((req, res, next) => {
    req.io = io
    return next();
})

require("./routes/index.js")(app, httpServer);
require("./sockets/index.js")(io);


console.log(`Server is running on port ${process.env.PORT}`)
httpServer.listen(process.env.PORT);