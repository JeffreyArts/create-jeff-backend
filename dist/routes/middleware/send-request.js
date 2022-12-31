/* global requireDatamodel,requireShared */
const _ = require("lodash");

module.exports = function(req, res) {
    req.resStatus = req.resStatus || 200;
    if (req.error) {
        req.resStatus = req.resStatus || 404;
    }

    if (_.isObject(req.resContent)) {
        return res.status(req.resStatus)
        .json(req.resContent);
    }

    return res.status(req.resStatus)
    .send(req.resContent);
};
