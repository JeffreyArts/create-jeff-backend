module.exports = function(req, res, next) {
    
    setTimeout(() => {
        req.resContent = "Test successfull";
        req.resStatus = 200;
        req.io.emit("test", req.resContent)
        return next();
    }, 500)
};