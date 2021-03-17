const pool = require("../database.js");

exports.topMedicines = (req, res) => {
    pool.query(
        `select rank() over (order by quantitySold desc) Ranking, Name as "Medicine Name",CompanyName,quantitySold from(
            select sum(quantity) as quantitySold,medicines.Name,medicines.CompanyName from order_item join medicines where order_item.MedicineID = medicines.MedicineID group by order_item.MedicineID order by quantitySold desc limit 5
            ) as topMedicines;`,
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

exports.rankingBySales = (req, res) => {
    pool.query(
        `select rank() over (order by total_sale desc) Rank_by_Sales,CompanyName,total_sale from
	(select medicines.CompanyName , sum(order_item.Cost * order_item.Quantity) as total_sale from medicines join order_item where order_item.MedicineID = medicines.MedicineID 
	group by medicines.CompanyName) as sales`,
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                res.json(rows);
            }
        }
    );
};

exports.login = (req, res) => {
    const oneTimePassword = 1234; //can be replaced with an API for OTP
    if (req.body.OTP == oneTimePassword) {
        pool.query(
            "select * from medicine_companies where Email = ?;",
            req.body.Email,
            function (err, rows, fields) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(rows);
                }
            }
        );
    } else res.send({ message: "Incorrect OTP" });
};
