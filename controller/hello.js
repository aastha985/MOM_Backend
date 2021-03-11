const pool = require("../database.js");

exports.hello = (req, res) => {
    pool.query("select * from user", function (err, rows, fields) {
        if (err) {
            console.log(err);
        } else {
            res.json(rows);
        }
    });
};
