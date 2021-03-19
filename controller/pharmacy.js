const pool = require("../database.js");
const bcrypt = require("bcrypt");

const  tableName = "pharmacies";
const  tableName2 = "pharmacy_credentials";

const saltRounds = 10;

exports.signup = (req, res) =>
{
	const username = req.body.username;
	const password = req.body.password;

	bcrypt.hash
	(
		password, 
		saltRounds, 
		(err, hash) =>
		{
			if (err)
				console.log(err);
			
			let myQuery = "INSERT INTO " +  tableName2;
			myQuery += "( username, hash ) VALUES "+" ( ?, ? )";

			pool.query
			(
				myQuery,
				[username, hash],
				function(err, result)
				{
					if (err)
						console.log(err);
					else
						res.send({ message: result });
				}
			);
		}
	);
};

exports.login = (req, res) =>
{
	const username = req.body.username;
	const password = req.body.password;

	let myQuery = "SELECT * FROM " +  tableName2 + " WHERE username = ? ;";

	pool.query
	(
		myQuery,
		username,
		(err, result) =>
		{
			if (err)
				res.send({ err: err });

			if (result && result.length > 0) 
			{
				bcrypt.compare
				(
					password,
					result[0].hash,
					(error, response) =>
					{
						if (response)
						{
							req.session.user = result;
							console.log(req.session.user);
							res.send(result);
						}
						else 
							res.send({ message: "Incorrect password" });
					}
				);
			}
			else
				res.send({ message: "Invalid username" });
		}
	);
};

exports.profile = (req,res) =>
{
	let myQuery = "SELECT ";
	myQuery += "*";	
	myQuery += " FROM " +  tableName;
	myQuery += " WHERE PharmacyID = ? ";

	pool.query
	(
		myQuery ,
		req.body.UserID,
		function (err, rows, fields)
		{
			if (err)
				console.log(err);
			else
				res.json(rows);
		}
	);
};

exports.isProfileCreated = (req, res) =>
{
	const myQuery = "SELECT COUNT(*) AS profileCreated FROM " +  tableName + " WHERE PharmacyID = ? ";

	pool.query
	(
		myQuery,
		req.body.UserID,
		function (err, rows, fields)
		{
			if (err)
				console.log(err);
			else
				res.json(rows);
		}
	);
};

exports.createProfile = (req, res) =>
{
	// console.log(req.body);

	const pharmacyId = req.body.UserID;
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
	const upiID = req.body.UpiId;

	const values = 
	[
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
		upiID
	];

	// for(let value of values)
	// 	console.log(value)

	// console.log(values);

    const columns =
	[
		"PharmacyID",
		"Name",

		"Phone Number 2",
		"Phone Number 1",
		"Street",
		"Apartment No.",
		"Landmark",
		"City",
		"State",
		"Pincode",
		
		"Description",
		"License No.",
		"Email Address",
		"Website",
		
		"A/C No.",
		"IFSC Code",
		"UPI ID"
	];
	
	let myQuery = "INSERT INTO " +  tableName;
	myQuery += " ( ";
	for(let column of columns)
		myQuery += "'" + column + "'" + ", ";
	myQuery = myQuery.slice(0,-2);
	myQuery += " ) ";
	myQuery	+= "VALUES";
	myQuery += " ( ";
	for(let i = 0 ; i < columns.length; ++i)
		myQuery += "?, ";
	myQuery = myQuery.slice(0,-2);
	myQuery += " )";

	// console.log(myQuery);

	pool.query
	(
		myQuery,
		// values,
		[
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
			upiID
		],
		function (err, result)
		{
			if (err)
				console.log(err);
			else
				res.send({ message: result });
		}
	);
};
