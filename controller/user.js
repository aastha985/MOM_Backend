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
                if (err) {
                    console.log(err);
                } else {
                    res.send({ message: result });
                }
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
        "select * from user where UserID = ?",
        req.body.UserID,
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                res.json(rows);
            }
        }
    );
};

exports.IsProfileCreated = (req, res) => {
    pool.query(
        "select count(*) as profileCreated from user where UserID = ?",
        req.body.UserID,
        function (err, rows, fields) {
            if (err) {
                console.log(err);
            } else {
                res.json(rows);
            }
        }
    );
};

exports.createProfile = (req, res) => {
    const userId = req.body.UserID;
    const firstName = req.body.FirstName;
    const lastName = req.body.LastName;
    const gender = req.body.Gender;
    const phoneNumber1 = req.body.PhoneNumber1;
    const phoneNumber2 = req.body.PhoneNumber2;
    const emailAddress = req.body.EmailAddress;
    const state = req.body.State;
    const city = req.body.City;
    const street = req.body.Street;
    const apartmentNo = req.body.ApartmentNumber;
    const pincode = req.body.Pincode;
    const landmark = req.body.Landmark;
    const isPremiumMember = 0;
    const DOB = req.body.DOB;

    pool.query(
        "INSERT INTO user (UserID,FirstName,LastName, Gender, PhoneNumber1,PhoneNumber2,EmailAddress, State, City,Street,ApartmentNumber, Pincode, Landmark,IsPremiumMember,DOB) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            userId,
            firstName,
            lastName,
            gender,
            phoneNumber1,
            phoneNumber2,
            emailAddress,
            state,
            city,
            street,
            apartmentNo,
            pincode,
            landmark,
            isPremiumMember,
            DOB,
        ],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send({ message: result });
            }
        }
    );
};
