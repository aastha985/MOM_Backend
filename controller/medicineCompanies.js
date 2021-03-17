const pool = require("../database.js");

exports.topMedicines = (req, res) => {
    pool.query(
        `select rank() over (order by quantitySold desc) Ranking, Name as "Medicine Name",CompanyName,quantitySold from(
            select sum(quantity) as quantitySold,medicines.Name,medicines.CompanyName from order_item join medicines on order_item.MedicineID = medicines.MedicineID group by order_item.MedicineID order by quantitySold desc limit 5
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
	(select medicines.CompanyName , sum(order_item.Cost * order_item.Quantity) as total_sale from medicines join order_item on order_item.MedicineID = medicines.MedicineID 
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

exports.medicines = (req, res) => {
    pool.query(
        "select m.Name,m.Description,m.Cost,m.Category,m.IsPrescibed,m.`Packaging Condition ( In Celcius)` from medicines as m join medicine_companies on m.CompanyID = medicine_companies.CompanyID where m.CompanyID=?;",
        req.params.CompanyID,
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else res.json(rows);
        }
    );
};

exports.medicineSales = (req, res) => {
    pool.query(
        "select m.Name, sum(Quantity) as quantitySold from medicines m join order_item o on m.MedicineID = o.MedicineID where CompanyID=? group by m.MedicineID order by quantitySold desc;",
        req.params.CompanyID,
        function (err, rows, fields) {
            if (err) console.log(err);
            else res.json(rows);
        }
    );
};
