const pool = require("../database.js");

exports.allMedicines = (req, res) => {
    pool.query("select * from medicines", function (err, rows, fields) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json(rows);
        }
    });
};

exports.medicineByCategory = (req, res) => {
    const category = req.params.category.replace(/\+/g, " ");
    pool.query(
        "select * from medicines where Category = ?",
        category,
        function (err, rows, fields) {
            if (err) {
                res.json({ error: err });
            } else {
                res.json(rows);
            }
        }
    );
};

exports.medicineByName = (req, res) => {
    const name = "%" + req.body.Name + "%";
    pool.query(
        "select * from medicines where Name like ?",
        name,
        function (err, rows, fields) {
            if (err) {
                res.json({ error: err });
            } else {
                res.json(rows);
            }
        }
    );
};
