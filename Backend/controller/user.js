const pool = require("../database.js");
const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.signup = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            res.json({ error: err });
        }

        pool.query(
            "INSERT INTO login_credentials (username, hash) VALUES (?,?)",
            [username, hash],
            (err, result) => {
                if (err) {
                    res.json({ error: err });
                } else {
                    res.json({ message: result });
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
                res.json({ error: err });
            }

            if (result && result.length > 0) {
                bcrypt.compare(password, result[0].hash, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        res.json(result);
                    } else {
                        res.json({
                            message: "Incorrect password",
                        });
                    }
                });
            } else {
                res.json({ message: "Invalid username" });
            }
        }
    );
};

exports.logout = (req, res) => {
    req.session.user = null;
    res.json({ message: "Successfully logged out!" });
};

exports.profile = (req, res) => {
    pool.query(
        "select * from user where UserID = ?",
        req.body.UserID,
        function (err, rows, fields) {
            if (err) {
                res.json({ error: err });
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
                res.json({ error: err });
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
                res.json({ error: err });
            } else {
                res.json({ message: result });
            }
        }
    );
};

exports.premium = (req, res) => {
    pool.query(
        "insert into `premium member` (DurationInDays,TransactionID,StartDate,UserID) values (?,?,curdate(),?)",
        [req.body.DurationInDays, req.body.TransactionID, req.body.UserID],
        (err, result) => {
            if (err) {
                res.json({ error: err });
            } else {
                pool.query(
                    "update user set IsPremiumMember = 1 where UserID = ?",
                    req.body.UserID,
                    (error, result_) => {
                        if (error) {
                            res.json({ error: error });
                        } else {
                            res.json({ message: result_ });
                        }
                    }
                );
            }
        }
    );
};

exports.premiumDetails = (req, res) => {
    pool.query(
        "select * from `premium member` where UserID = ?",
        req.body.UserID,
        (err, result) => {
            if (err) {
                res.json({ error: err });
            } else {
                res.json({ message: result });
            }
        }
    );
};

exports.IsDoctor = (req, res) => {
    pool.query(
        "select count(*) as IsDoctor from doctor where UserID = ?",
        req.body.UserID,
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.doctor = (req, res) => {
    pool.query(
        "insert into doctor (UserID,LicenseNo,Degree,Department) values (?,?,?,?)",
        [
            req.body.UserID,
            req.body.LicenseNo,
            req.body.Degree,
            req.body.Department,
        ],
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json({ message: result });
        }
    );
};

exports.doctorProfile = (req, res) => {
    pool.query(
        "select * from doctor where UserID = ?",
        req.body.UserID,
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.doctorPrescriptions = (req, res) => {
    pool.query(
        `SELECT PrescriptionID,ImageURL as Prescription,PrescriptionDate,CONCAT(FirstName," ",LastName) as "PatientName",PhoneNumber1 as "PatientPhoneNumber" FROM prescription join user on prescription.PatientUserID = user.UserID where prescription.DoctorUserID=?`,
        req.body.UserID,
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.userPrescriptions = (req, res) => {
    pool.query(
        `SELECT PrescriptionID,ImageURL,PrescriptionDate,CONCAT(FirstName," ",LastName) as "DoctorName",PhoneNumber1 as "DoctorPhoneNumber" FROM prescription join user on user.UserID = prescription.DoctorUserID where PatientUserID = ?`,
        req.body.UserID,
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.prescribe = (req, res) => {
    pool.query(
        "insert into prescription (ImageURL,PrescriptionDate,DoctorUserID,PatientUserID) values (?,?,?,?)",
        [
            req.body.url,
            req.body.date,
            req.body.doctorUserID,
            req.body.patientUserID,
        ],
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.viewCart = (req, res) => {
    pool.query(
        "select * from cart_items where UserID = ?",
        req.params.UserID,
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.insertCartItem = (req, res) => {
    pool.query(
        "insert into cart_items (UserID,MedicineID) values(?,?)",
        [req.params.UserID, req.body.MedicineID],
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.updateCartItem = (req, res) => {
    pool.query(
        "update cart_items set Quantity=? where UserID = ? and MedicineID = ?",
        [req.body.Quantity, req.params.UserID, req.body.MedicineID],
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.deleteCartItem = (req, res) => {
    pool.query(
        "delete from cart_items where UserID = ? and MedicineID = ?",
        [req.params.UserID, req.body.MedicineID],
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.orders = (req, res) => {
    pool.query(
        "select * from orders where UserID = ?",
        req.body.UserID,
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.createOrder = (req, res) => {
    pool.query(
        "insert into orders(ItemsQuantity,State,City,Street,ApartmentNumber,Pincode,Landmark,Discount,DeliveryCost,TotalAmount,ModeOfPayment,TransactionID,OrderDate,DeliveryDate,Subscription,PharmacyID,PrescriptionID,UserID,Status) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            req.body.ItemsQuantity,
            req.body.State,
            req.body.City,
            req.body.Street,
            req.body.ApartmentNumber,
            req.body.Pincode,
            req.body.Landmark,
            req.body.Discount,
            req.body.DeliveryCost,
            req.body.TotalAmount,
            req.body.ModeOfPayment,
            req.body.TransactionID,
            req.body.OrderDate,
            req.body.DeliveryDate,
            req.body.Subscription,
            req.body.PharamcyID,
            req.body.PrescriptionID,
            req.body.UserID,
            req.body.Status,
        ],
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.placeOrder = (req, res) => {
    pool.query(
        "insert into order_item (Cost,Quantity,OrderID,MedicineID)(select m.Cost, c.Quantity,? as OrderID,c.MedicineID from cart_items c join medicines m on c.MedicineID =m.MedicineID where UserID = ?)",
        [req.body.OrderID, req.body.UserID],
        (err, result) => {
            if (err)
                return res.json({ message: "Failed to fetch items from cart" });
            else {
                pool.query(
                    "update orders set status = 2 where OrderID = ?",
                    req.body.OrderID,
                    (error, response) => {
                        if (error)
                            return response.json({
                                message: "Failed to place order",
                            });
                        else {
                            pool.query(
                                "delete from cart_items where UserID = ?",
                                req.body.UserID,
                                (err, ress) => {
                                    if (err) {
                                        return res.json({
                                            error:
                                                "Order Placed. Couldn't remove items from the cart.",
                                        });
                                    } else {
                                        return res.json(ress);
                                    }
                                }
                            );
                        }
                    }
                );
            }
        }
    );
};

exports.updateOrderStatus = (req, res) => {
    pool.query(
        "update orders set Status = ? where OrderID = ?",
        [req.body.status, req.body.OrderID],
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.createSubscription = (req, res) => {
    pool.query(
        "insert into subscription(MedicineID,Cost,Quantity,StartDate,UserID,Duration_In_Days,Status,LastOrderDate) values (?,?,?,?,?,?,1,curdate())",
        [
            req.body.MedicineID,
            req.body.Cost,
            req.body.Quantity,
            req.body.StartDate,
            req.body.UserID,
            req.body.DurationInDays,
        ],
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.allSubscriptions = (req, res) => {
    pool.query(
        "select * from subscription where UserID = ?",
        req.body.UserID,
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.updateSubscriptionStatus = (req, res) => {
    pool.query(
        "update subscription set Status = ? where SubscriptionID = ?",
        [req.body.Status, req.body.SubscriptionID],
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.generateOrderFromSubscription = (req, res) => {
    pool.query(
        "insert into order_item (Cost,Quantity,OrderID,MedicineID)(select Cost,Quantity,? as OrderID,MedicineID from subscription where UserID = ? and Status = 1);",
        [req.body.OrderID, req.body.UserID],
        (err, result) => {
            if (err) return res.json({ error: err });
            else {
                pool.query(
                    "update orders set status = 2 where OrderID = ?",
                    req.body.OrderID,
                    (error, response) => {
                        if (error)
                            return res.json({
                                message: "Failed to place order",
                            });
                        else {
                            pool.query(
                                "update subscription set LastOrderDate = curdate() where UserID = ? and Status = 1",
                                req.body.UserID,
                                (errr, ress) => {
                                    if (errr) return res.json({ error: errr });
                                    else return res.json(ress);
                                }
                            );
                        }
                    }
                );
            }
        }
    );
};

exports.allComplaints = (req, res) => {
    pool.query(
        "select * from complaints where UserID = ?",
        req.body.UserID,
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.newComplaint = (req, res) => {
    pool.query(
        "insert into complaints (Description,RelatedTo,ComplaintDate,UserID,OrderID_If_Applicable) values (?,?,curdate(),?,?)",
        [
            req.body.Description,
            req.body.RelatedTo,
            req.body.UserID,
            req.body.OrderID,
        ],
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.updateComplaintStatus = (req, res) => {
    pool.query(
        "update complaints set Pending = ? where ComplaintsID = ?",
        [req.body.status, req.body.complaintsID],
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.donate = (req, res) => {
    pool.query(
        "insert into donations (UserID,Request_Date,Pickup_Date) values(?,curdate(),?)",
        [req.body.UserID, req.body.pickupDate],
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};

exports.addDonationItem = (req, res) => {
    pool.query(
        "insert into donation_item (DonationID,MedicineID,Quantity,Total_MRP) values (?,?,?,?)",
        [
            req.body.DonationID,
            req.body.MedicineID,
            req.body.Quantity,
            req.body.Total_MRP,
        ],
        (err, result) => {
            if (err) res.json({ error: err });
            else res.json(result);
        }
    );
};
