const pool = require("../database.js");
const bcrypt = require("bcrypt");

const tableName1 = "pharmacies";
const tableName2 = "pharmacy_credentials";
const tableName3 = "orders";
const tableName4 = "order_item";

const saltRounds = 10;

exports.signup = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) res.json({error: err});

        let myQuery = "INSERT INTO " + tableName2;
        myQuery += "( username, hash ) VALUES " + " ( ?, ? )";

        pool.query(myQuery, [username, hash], function (err, result) {
            if (err) res.json({error: err});
            else res.json({ message: result });
        });
    });
};

exports.logout = (req, res) => {
    req.session.user = null;
    res.json({ message: "Successfully logged out!" });
};

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let myQuery = "SELECT * FROM " + tableName2 + " WHERE username = ? ;";

    pool.query(myQuery, username, (err, result) => {
        if (err) res.json({ err: err });

        if (result && result.length > 0) {
            bcrypt.compare(password, result[0].hash, (error, response) => {
                if (response) {
                    req.session.user = result;
                    res.json(result);
                } else res.json({ message: "Incorrect password" });
            });
        } else res.json({ message: "Invalid username" });
    });
};

exports.profile = (req, res) => {
    let myQuery = "SELECT ";
    myQuery += "*";
    myQuery += " FROM " + tableName1;
    myQuery += " WHERE PharmacyID = ? ";

    pool.query(myQuery, req.body.PharmacyID, function (err, result) {
        if (err) res.json({error: err});
        else res.json(result);
    });
};

exports.isProfileCreated = (req, res) => {
    const myQuery =
        "SELECT COUNT(*) AS profileCreated FROM " +
        tableName1 +
        " WHERE PharmacyID = ? ";

    pool.query(myQuery, req.body.PharmacyID, function (err, result) {
        if (err) res.json({error: err});
        else res.json(result);
    });
};

exports.createProfile = (req, res) => {
    const pharmacyId = req.body.PharmacyID;
    const name = req.body.UserName;

    const phoneNumber1 = req.body.PhoneNumber1;
    const phoneNumber2 = req.body.PhoneNumber2;
    const street = req.body.Street;
    const apartment = req.body.Apartment;
    const landmark = req.body.Landmark;
    const city = req.body.City;
    const state = req.body.State;
    const pincode = req.body.Pincode;

    const description = req.body.Description;
    const license = req.body.License;
    const email = req.body.Email;
    const website = req.body.Website;

    const accountNumber = req.body.Account;
    const ifscCode = req.body.IfscCode;
    const upiID = req.body.UpiID;

    const values = [
        pharmacyId,
        name,

        phoneNumber1,
        phoneNumber2,
        street,
        apartment,
        landmark,
        city,
        state,
        pincode,

        description,
        license,
        email,
        website,

        accountNumber,
        ifscCode,
        upiID,
    ];

    const columns = [
        "PharmacyID",
        "Name",

        "PhoneNumber1",
        "PhoneNumber2",
        "Street",
        "ApartmentNo",
        "Landmark",
        "City",
        "State",
        "Pincode",

        "Description",
        "LicenseNo",
        "EmailAddress",
        "Website",

        "AC_No",
        "IFSC_Code",
        "UPI_ID",
    ];

    let myQuery = "INSERT INTO " + tableName1;
    myQuery += " ( ";
    for (let column of columns) myQuery += "`" + column + "`" + ", ";
    myQuery = myQuery.slice(0, -2);
    myQuery += " ) ";
    myQuery += "VALUES";
    myQuery += " ( ";
    for (let i = 0; i < columns.length; ++i) myQuery += "?, ";
    myQuery = myQuery.slice(0, -2);
    myQuery += " )";

    pool.query(myQuery, values, function (err, result) {
        if (err) res.json({error: err});
        else res.json({ message: result });
    });
};

exports.allOrders = (req, res) => {

    const pharmacyId = req.body.PharmacyID;

    const columns1 = [
        "OrderID",
        "ItemsQuantity",
        "OrderDate",
        "AgentID",
        "Status",
    ];

    const columns2 = ["OrderItemNo", "MedicineID", "Quantity"];

    const joinKeys = [["OrderID", "OrderID"]];

    const keys = [tableName3 + "." + "PharmacyID"];

    const values = [pharmacyId];

    const joinType = "INNER JOIN";

    let myQuery = "SELECT ";
    for (let column of columns1)
        myQuery += tableName3 + "." + "`" + column + "`" + ", ";
    for (let column of columns2)
        myQuery += tableName4 + "." + "`" + column + "`" + ", ";
    myQuery = myQuery.slice(0, -2);
    myQuery += " FROM ";
    myQuery += tableName3 + " " + joinType + " " + tableName4;
    myQuery += " ON ";
    for (let key of joinKeys)
        myQuery +=
            tableName3 +
            "." +
            key[0] +
            " = " +
            tableName4 +
            "." +
            key[1] +
            " AND ";
    myQuery = myQuery.slice(0, -4);
    myQuery += "WHERE ";
    for (let key of keys) myQuery += key + " = " + "?" + " AND ";
    myQuery = myQuery.slice(0, -4);

    pool.query(myQuery, values, function (err, result) {
        if (err) res.json({error: err});
        else res.json(result);
    });
};

exports.dueOrders = (req, res) => {

    const pharmacyId = req.body.PharmacyID;

    const due = ["Delivered", "Cancelled"];

    const columns1 = [
        "OrderID",
        "ItemsQuantity",
        "OrderDate",
        "AgentID",
        "Status",
    ];

    const columns2 = ["OrderItemNo", "MedicineID", "Quantity"];

    const joinKeys = [["OrderID", "OrderID"]];

    const keys = [tableName3 + "." + "PharmacyID"];

    const notKeys = [];
    for (let i = 0; i < due.length; i++)
        notKeys.push(tableName3 + "." + "Status");

    const values = [pharmacyId, ...due];

    const joinType = "INNER JOIN";

    let myQuery = "SELECT ";
    for (let column of columns1)
        myQuery += tableName3 + "." + "`" + column + "`" + ", ";
    for (let column of columns2)
        myQuery += tableName4 + "." + "`" + column + "`" + ", ";
    myQuery = myQuery.slice(0, -2);
    myQuery += " FROM ";
    myQuery += tableName3 + " " + joinType + " " + tableName4;
    myQuery += " ON ";
    for (let key of joinKeys)
        myQuery +=
            tableName3 +
            "." +
            key[0] +
            " = " +
            tableName4 +
            "." +
            key[1] +
            " AND ";
    myQuery = myQuery.slice(0, -4);
    myQuery += "WHERE ";
    for (let key of keys) myQuery += key + " = " + "?" + " AND ";
    for (let key of notKeys) myQuery += key + " != " + "?" + " AND ";
    myQuery = myQuery.slice(0, -4);

    pool.query(myQuery, values, function (err, result) {
        if (err) res.json({error: err});
        else res.json(result);
    });
};

exports.completedOrders = (req, res) => {

    const pharmacyId = req.body.PharmacyID;

    const completed = "Delivered";

    const columns1 = [
        "OrderID",
        "ItemsQuantity",
        "OrderDate",
        "AgentID",
        "Status",
    ];

    const columns2 = ["OrderItemNo", "MedicineID", "Quantity"];

    const joinKeys = [["OrderID", "OrderID"]];

    const keys = [tableName3 + "." + "PharmacyID", tableName3 + "." + "Status"];

    const values = [pharmacyId, completed];

    const joinType = "INNER JOIN";

    let myQuery = "SELECT ";
    for (let column of columns1)
        myQuery += tableName3 + "." + "`" + column + "`" + ", ";
    for (let column of columns2)
        myQuery += tableName4 + "." + "`" + column + "`" + ", ";
    myQuery = myQuery.slice(0, -2);
    myQuery += " FROM ";
    myQuery += tableName3 + " " + joinType + " " + tableName4;
    myQuery += " ON ";
    for (let key of joinKeys)
        myQuery +=
            tableName3 +
            "." +
            key[0] +
            " = " +
            tableName4 +
            "." +
            key[1] +
            " AND ";
    myQuery = myQuery.slice(0, -4);
    myQuery += "WHERE ";
    for (let key of keys) myQuery += key + " = " + "?" + " AND ";
    myQuery = myQuery.slice(0, -4);

    pool.query(myQuery, values, function (err, result) {
        if (err) res.json({error: err});
        else res.json(result);
    });
};
