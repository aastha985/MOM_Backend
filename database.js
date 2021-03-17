const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createConnection({
    connectionLimit: 5,
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB,
    password: process.env.PASSWORD,
});
module.exports = pool;
