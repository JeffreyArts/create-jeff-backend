/* global requireApi */

const { config } = require('dotenv');
config();

const sendRequest       = require("./middleware/send-request.js");

module.exports = function(app, server) {
 
    let CORS = process.env.CORS;
    if (process.env.CORS !== "*") {
        CORS = process.env.CORS.split(",").map(url => {
            if (url == '*') {
                return url;
            }
            return `http://${url.trim()},https://${url.trim()}`
        
        })
    }
    
    app.use((req, res, next) => {
        // res.header("Access-Control-Allow-Origin", CORS.toString());
        // res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        
        res.header('Access-Control-Allow-Origin', CORS);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        return next();
    });

//////////////////////////////////////////////
// Home
//////////////////////////////////////////////
    app.get("/", require("./home.js"), sendRequest);
    app.post("/test", require("./test.js"), sendRequest);

    
    return server;
};
