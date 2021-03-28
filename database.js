const mysql = require("mysql");
require("dotenv").config();

const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DB,
    password: process.env.PASSWORD,
    port: 3306,
});
module.exports = pool;
