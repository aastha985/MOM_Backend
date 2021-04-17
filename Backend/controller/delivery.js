const pool = require("../database.js");

const tableName1 = "delivery_agent";
const tableName2 = "orders";

exports.agentProfile = (request, response) =>
{
	const agentID = request.body.AgentID;

	const myQuery = "SELECT * FROM " + tableName1 + " WHERE AgentID = ? ;";

	pool.query
	(
		myQuery,
		agentID,
		(error, result) =>
		{
			if(error)
				response.json({error: error}) ;
			else
				response.json(result);
		}
	);
};

exports.createAgentProfile = (request, response) =>
{
	const agentID = request.body.AgentID;
	const firstName = request.body.FirstName;
	const lastName = request.body.LastName;
	const dob = request.body.DOB;
	const gender = request.body.Gender;

	const phoneNumber1 = request.body.PhoneNumber1;
	const phoneNumber2 = request.body.PhoneNumber2;
	const emailAddress = request.body.EmailAddress;
	const drivingLicense = request.body.DrivingLicense;
	const description = request.body.Description;
	
	const apartment = request.body.Apartment;
	const street = request.body.Street;
	const landmark = request.body.Landmark;
	const city = request.body.City;
	const state = request.body.State;
	const pincode = request.body.Pincode;

	const salary = request.body.Salary;
	const accountNumber = request.body.AccountNumber;
	const ifscCode = request.body.IfscCode;
	const upiID = request.body.UpiID;

	const values = 
	[
		agentID,
		firstName,
		lastName,
		dob,
		gender,
	
		phoneNumber1,
		phoneNumber2,
		emailAddress,
		drivingLicense,
		description,
		
		apartment,
		street,
		landmark,
		city,
		state,
		pincode,

		salary,
		accountNumber,
		ifscCode,
		upiID
	];

	const columns =
	[
		"AgentID",
		"FirstName",
		"LastName",
		"DOB",
		"Gender",

		"PhoneNumber1",
		"PhoneNumber2",
		"EmailAddress",
		"DrvingLicenseNo",
		"Description",

		"ApartmentNo",
		"Street",
		"Landmark",
		"City",
		"State",
		"Pincode",
		
		"salary",
		"BankAC_No",
		"IFSC_Code",
		"UPI_ID"
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
	myQuery += " ) ;";

	pool.query
	(
		myQuery,
		values,
		function (error, result)
		{
			if (error)
				response.json({error: error}) ;
			else
				response.json({ message: result });
		}
	);
};

exports.agentDueOrders = (request, response) =>
{
	const agentId = request.body.AgentID;

	const due = 
	[
		"Delivered",
		"Cancelled"
	];
	
	const columns =
	[
		"OrderID",
		"PharmacyID",
		"DeliveryDate"
	];
	
	const keys = 
	[
		tableName2 + "." + "AgentID"
	];

	const notKeys = [];
	for(let i = 0; i < due.length; i++)
		notKeys.push(tableName2 + "." + "Status");

	const values = 
	[
		agentId,
		... due
	];

	let myQuery = "SELECT " ;	
	for(let column of columns)
		myQuery += tableName2 + "." + "`" + column + "`" + ", ";
	myQuery = myQuery.slice(0,-2);
	myQuery	+= " FROM " + tableName2 ;
	myQuery += " WHERE ";
	for(let key of keys)
		myQuery += key + " = " + "?" + " AND ";
	for(let key of notKeys)
		myQuery += key + " != " + "?" + " AND ";
	myQuery = myQuery.slice(0,-4);
	
	pool.query
	(
		myQuery,
		values,
		function (error, result)
		{
			if (error)
				response.json({error: error}) ;
			else
				response.json(result);
		}
	);
};

exports.allOrders = (request, response) =>
{
	const columns =
	[
		"OrderID",
		"PharmacyID",
		"AgentID",
		"Status",
		"DeliveryDate"
	];

	let myQuery = "SELECT " ;	
	for(let column of columns)
		myQuery += tableName2 + "." + "`" + column + "`" + ", ";
	myQuery = myQuery.slice(0,-2);
	myQuery	+= " FROM " + tableName2 ;

	pool.query
	(
		myQuery,
		function (error, result)
		{
			if (error)
				response.json({error: error}) ;
			else
				response.json(result);
		}
	);
};

exports.dueOrders = (request, response) =>
{
	const columns =
	[
		"OrderID",
		"PharmacyID",
		"AgentID",
		"DeliveryDate"
	];
	
	const due = 
	[
		"Delivered",
		"Cancelled"
	];

	const notKeys = [];
	for(let i = 0; i < due.length; i++)
		notKeys.push(tableName2 + "." + "Status");

	const values = 
	[
		... due
	];

	let myQuery = "SELECT " ;	
	for(let column of columns)
		myQuery += tableName2 + "." + "`" + column + "`" + ", ";
	myQuery = myQuery.slice(0,-2);
	myQuery	+= " FROM " + tableName2 ;
	myQuery += " WHERE ";
	for(let key of notKeys)
		myQuery += key + " != " + "?" + " AND ";
	myQuery = myQuery.slice(0,-4);

	pool.query
	(
		myQuery,
		values,
		function (error, result)
		{
			if (error)
				response.json({error: error}) ;
			else
				response.json(result);
		}
	);
};

exports.onDateOrders = (request, response) =>
{
	const date = request.body.Date;
	
	const columns =
	[
		"OrderID",
		"PharmacyID",
		"AgentID",
		"Status",
		"DeliveryDate"
	];

	const keys = 
	[
		tableName2 + "." + "DeliveryDate"
	];

	const values = 
	[
		date
	];

	let myQuery = "SELECT " ;	
	for(let column of columns)
		myQuery += tableName2 + "." + "`" + column + "`" + ", ";
	myQuery = myQuery.slice(0,-2);
	myQuery	+= " FROM " + tableName2 ;
	myQuery += " WHERE ";
	for(let key of keys)
		myQuery += key + " = " + "?" + " AND ";
	myQuery = myQuery.slice(0,-4);
	myQuery += " ;";

	pool.query
	(
		myQuery,
		values,
		function (error, result)
		{
			if (error)
				response.json({error: error}) ;
			else
				response.json(result);
		}
	);
};

exports.betweenDateOrders = (request, response) =>
{
	const fromDate = request.body.FromDate;
	const toDate = request.body.ToDate;
	
	const columns =
	[
		"OrderID",
		"PharmacyID",
		"AgentID",
		"Status",
		"DeliveryDate"
	];

	const keys = 
	[
		tableName2 + "." + "DeliveryDate"
	];

	const values = 
	[
		fromDate,
		toDate
	];

	let myQuery = "SELECT " ;	
	for(let column of columns)
		myQuery += tableName2 + "." + "`" + column + "`" + ", ";
	myQuery = myQuery.slice(0,-2);
	myQuery	+= " FROM " + tableName2 ;
	myQuery += " WHERE ";
	for(let key of keys)
		myQuery += key + " BETWEEN " + "?" + " AND " + "?" + " AND ";
	myQuery = myQuery.slice(0,-4);
	myQuery += ";";

	pool.query
	(
		myQuery,
		values,
		function (error, result)
		{
			if (error)
				response.json({error: error}) ;
			else
				response.json(result);
		}
	);
};
