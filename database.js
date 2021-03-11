const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createConnection({
    connectionLimit: 100,
    host: "sql6.freemysqlhosting.net",
    user: "sql6397997",
    database: "sql6397997",
    password: process.env.DB_PASS,
});
console.log(pool);
module.exports = pool;
