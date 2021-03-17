const pool = require("../database.js");

exports.topMedicines = (req, res) => {
    pool.query(
        "select sum(quantity) as quantitySold,medicines.Name,medicines.CompanyName from order_item join medicines where order_item.MedicineID = medicines.MedicineID group by order_item.MedicineID order by quantitySold desc limit ?;",
        req.body.limit,
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                res.json(rows);
            }
        }
    );
};
