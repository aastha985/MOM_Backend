const pool = require("../database.js");

exports.home = (req, res) => {
    res.json({message: "Home Page"});
};
