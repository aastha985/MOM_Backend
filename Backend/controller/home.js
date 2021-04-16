const pool = require("../database.js");

exports.home = (req, res) => {
    res.json({message: "Welcome to Master of Medicines"});
};
