const express = require("express");
const mysql = require("mysql");
const app = express();

require("dotenv").config();

const connection = mysql.createConnection({
    host: "sql6.freemysqlhosting.net",
    user: "sql6397997",
    database: "sql6397997",
    password: process.env.DB_PASS,
});

connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log("Connected");
    }
});

app.get("/", function (req, res) {
    connection.query("select * from user", function (err, rows, fields) {
        if (!!err) {
            console.log(err);
        } else {
            console.log("success");
        }
    });
});
// app.use("/api/", require("./routes/hello"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
    console.log(`Express server is running on Port: ${PORT}`)
);
