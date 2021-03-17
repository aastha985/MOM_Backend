const pool = require("../database.js");

exports.allMedicines = (req, res) => {
    const resultsPerPage = 10;
    const offset = (req.body.pageNumber - 1) * resultsPerPage;
    pool.query(
        "select * from medicines limit ? offset ?",
        [resultsPerPage, offset],
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                res.json(rows);
            }
        }
    );
};

exports.medicineByCategory = (req, res) => {
    const category = req.params.category.replace(/\+/g, " ");
    pool.query(
        "select * from medicines where Category = ?",
        category,
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                res.json(rows);
            }
        }
    );
};
