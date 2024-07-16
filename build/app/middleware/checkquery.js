"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkQuery = (req, res, next) => {
    const { keyaccess } = req.query;
    if (keyaccess == undefined) {
        return res.status(404).json({ message: "ERROR : keyaccess is invalid" });
    }
    else if (AccountTwitter[keyaccess] == undefined && req.path !== "/loadsession") {
        return res.status(404).json({ message: "ERROR : Account is invalid" });
    }
    next();
};
exports.default = checkQuery;
