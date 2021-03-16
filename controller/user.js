const pool = require("../database.js");
const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.signup = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err);
        }

        pool.query(
            "INSERT INTO login_credentials (username, hash) VALUES (?,?)",
            [username, hash],
            (err, result) => {
                console.log(err);
            }
        );
    });
};

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    pool.query(
        "SELECT * FROM login_credentials WHERE username = ?;",
        username,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result && result.length > 0) {
                bcrypt.compare(password, result[0].hash, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send({
                            message: "Incorrect password",
                        });
                    }
                });
            } else {
                res.send({ message: "Invalid username" });
            }
        }
    );
};

exports.profile = (req, res) => {
    pool.query(
        "select * from user where userID = ?",
        req.body.userID,
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                res.json(rows);
            }
        }
    );
};
