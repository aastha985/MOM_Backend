const pool = require("../database.js");

exports.allPharmacies = (req,res) =>
{
	console.log("req");

	pool.query
	(
		"select Name, Description from pharmacies" ,
		function (err, rows, fields)
		{
			if (err)
				console.log(err);
			else
				res.json(rows);
		}
	);
};

exports.profile = (req,res) =>
{
	const columns = 
	[
		"Name" ,
		"License No." ,
		"Phone Number 1" ,
		"Phone Number 2" ,
		"Website" ,
		"Email Address" ,
		"Description" ,
		"Apartment No." ,
		"Street" ,
		"Landmark" ,
		"City" ,
		"State" ,
		"Pincode"
	];

	let queryString = "SELECT ";
	for(column of columns)
		queryString += "'" + column + "', ";
	queryString = queryString.slice(0,-2);
	queryString += " FROM Pharmacies WHERE PharmacyID = ?";

	pool.query
	(
		queryString ,
		req.params.PharmacyID ,
		function (err, rows, fields)
		{
			if (err)
				console.log(err);
			else
				res.json(rows);
		}
	);
};
