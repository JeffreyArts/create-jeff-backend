module.exports = function(req, res, next) {
    // console.log(req.io.socket)
    req.resContent = "Api server running.";
    req.resStatus = 200;
    return next();
};