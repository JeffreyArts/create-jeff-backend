const { config } = require('dotenv');
config();

module.exports = function(io, server) {
    
    io.on('connection', (socket) => {
        socket.on('test', require("./test.js"))
    });

    return io;
};
