const pool = require("../database.js");
const bcrypt = require("bcrypt");

const tableName1 = "pharmacies";
const tableName2 = "pharmacy_credentials";
const tableName3 = "orders";
const tableName4 = "order_item";

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
				function (err, result)
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
	myQuery += " FROM " +  tableName1;
	myQuery += " WHERE PharmacyID = ? ";

	pool.query
	(
		myQuery ,
		req.body.UserID,
		function (err, result)
		{
			if (err)
				console.log(err);
			else
				res.send(result);
		}
	);
};

exports.isProfileCreated = (req, res) =>
{
	const myQuery = "SELECT COUNT(*) AS profileCreated FROM " +  tableName1 + " WHERE PharmacyID = ? ";

	pool.query
	(
		myQuery,
		req.body.UserID,
		function (err, result)
		{
			if (err)
				console.log(err);
			else
				res.send(result);
		}
	);
};

exports.createProfile = (req, res) =>
{
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
	const upiID = req.body.UpiID;

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

	const columns =
	[
		"PharmacyID",
		"Name",

		"Phone Number 1",
		"Phone Number 2",
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
	
	let myQuery = "INSERT INTO " +  tableName1;
	myQuery += " ( ";
	for(let column of columns)
		myQuery += "`" + column + "`" + ", ";
	myQuery = myQuery.slice(0,-2);
	myQuery += " ) ";
	myQuery	+= "VALUES";
	myQuery += " ( ";
	for(let i = 0 ; i < columns.length; ++i)
		myQuery += "?, ";
	myQuery = myQuery.slice(0,-2);
	myQuery += " )";

	pool.query
	(
		myQuery,
		values,
		function (err, result)
		{
			if (err)
				console.log(err);
			else
				res.send({ message: result });
		}
	);
};

exports.allOrders = (req, res) =>
{
	const resultsPerPage = 10;

	const pharmacyId = req.body.UserID;
	const offset = (req.body.PageNumber - 1) * resultsPerPage;

	const columns1 =
	[
		"OrderID",
		"ItemsQuantity",
		"OrderDate",
		"AgentID",
		"Status",
	];

	const columns2 = 
	[
		"Order Item No.",
		"MedicineID",
		"Quantity"
	];

	const joinKeys = 
	[
		["OrderID", "OrderID"]
	];
	
	const keys = 
	[
		tableName3 + "." + "PharmacyID"
	]

	const values = 
	[
		pharmacyId,
		resultsPerPage,
		offset
	]

	const joinType = "INNER JOIN";

	let myQuery = "SELECT " ;	
	for(let column of columns1)
		myQuery += tableName3 + "." + "`" + column + "`" + ", ";
	for(let column of columns2)
		myQuery += tableName4 + "." + "`" + column + "`" + ", ";
	myQuery = myQuery.slice(0,-2);
	myQuery	+= " FROM ";
	myQuery += tableName3 + " " + joinType + " " + tableName4;
	myQuery	+= " ON ";
	for(let key of joinKeys)
		myQuery += tableName3 + "." + key[0] + " = " + tableName4 + "." + key[1] + " AND ";
	myQuery = myQuery.slice(0,-4);
	myQuery += "WHERE ";
	for(let key of keys)
		myQuery += key + " = " + "?" + " AND ";
	myQuery = myQuery.slice(0,-4);
	myQuery += " LIMIT " + "?" + " OFFSET " + "?";

	pool.query
	(
		myQuery,
		values,
		function (err, result)
		{
			if (err)
				console.log(err);
			else
				res.send(result);
		}
	);
};

exports.dueOrders = (req, res) =>
{
	const resultsPerPage = 10;

	const pharmacyId = req.body.UserID;
	const offset = (req.body.PageNumber - 1) * resultsPerPage;

	const due = 
	[
		"Delivered",
		"Cancelled",
	];
	
	const columns1 =
	[
		"OrderID",
		"ItemsQuantity",
		"OrderDate",
		"AgentID",
		"Status",
	];

	const columns2 = 
	[
		"Order Item No.",
		"MedicineID",
		"Quantity"
	];

	const joinKeys = 
	[
		["OrderID", "OrderID"]
	];
	
	const keys = 
	[
		tableName3 + "." + "PharmacyID"
	];

	const notKeys = [];
	for(let i = 0; i < due.length; i++)
		notKeys.push(tableName3 + "." + "Status");

	const values = 
	[
		pharmacyId,
		... due,
		resultsPerPage,
		offset
	];

	const joinType = "INNER JOIN";

	let myQuery = "SELECT " ;	
	for(let column of columns1)
		myQuery += tableName3 + "." + "`" + column + "`" + ", ";
	for(let column of columns2)
		myQuery += tableName4 + "." + "`" + column + "`" + ", ";
	myQuery = myQuery.slice(0,-2);
	myQuery	+= " FROM ";
	myQuery += tableName3 + " " + joinType + " " + tableName4;
	myQuery	+= " ON ";
	for(let key of joinKeys)
		myQuery += tableName3 + "." + key[0] + " = " + tableName4 + "." + key[1] + " AND ";
	myQuery = myQuery.slice(0,-4);
	myQuery += "WHERE ";
	for(let key of keys)
		myQuery += key + " = " + "?" + " AND ";
	for(let key of notKeys)
		myQuery += key + " != " + "?" + " AND ";
	myQuery = myQuery.slice(0,-4);
	myQuery += " LIMIT " + "?" + " OFFSET " + "?";

	pool.query
	(
		myQuery,
		values,
		function (err, result)
		{
			if (err)
				console.log(err);
			else
				res.send(result);
		}
	);
};

exports.completedOrders = (req, res) =>
{
	const resultsPerPage = 10;

	const pharmacyId = req.body.UserID;
	const offset = (req.body.PageNumber - 1) * resultsPerPage;

	const completed = "Delivered";
	
	const columns1 =
	[
		"OrderID",
		"ItemsQuantity",
		"OrderDate",
		"AgentID",
		"Status",
	];

	const columns2 = 
	[
		"Order Item No.",
		"MedicineID",
		"Quantity"
	];

	const joinKeys = 
	[
		["OrderID", "OrderID"]
	];
	
	const keys = 
	[
		tableName3 + "." + "PharmacyID",
		tableName3 + "." + "Status"
	];

	const values = 
	[
		pharmacyId,
		completed,
		resultsPerPage,
		offset
	];

	const joinType = "INNER JOIN";

	let myQuery = "SELECT " ;	
	for(let column of columns1)
		myQuery += tableName3 + "." + "`" + column + "`" + ", ";
	for(let column of columns2)
		myQuery += tableName4 + "." + "`" + column + "`" + ", ";
	myQuery = myQuery.slice(0,-2);
	myQuery	+= " FROM ";
	myQuery += tableName3 + " " + joinType + " " + tableName4;
	myQuery	+= " ON ";
	for(let key of joinKeys)
		myQuery += tableName3 + "." + key[0] + " = " + tableName4 + "." + key[1] + " AND ";
	myQuery = myQuery.slice(0,-4);
	myQuery += "WHERE ";
	for(let key of keys)
		myQuery += key + " = " + "?" + " AND ";
	myQuery = myQuery.slice(0,-4);
	myQuery += " LIMIT " + "?" + " OFFSET " + "?";

	pool.query
	(
		myQuery,
		values,
		function (err, result)
		{
			if (err)
				console.log(err);
			else
				res.send(result);
		}
	);
};
