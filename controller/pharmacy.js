const pool = require("../database.js");

const table_name = "pharmacies";

exports.allPharmacies = (req,res) =>
{
	const columns =
	[
		"Name",
		"Description"
	];

	let myQuery = "SELECT "
	for(let column of columns)
		myQuery += column + ", ";
	myQuery = myQuery.slice(0,-2);	
	myQuery += " FROM " + table_name;

	pool.query
	(
		myQuery,
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
	let myQuery = "SELECT ";
	myQuery += "*";	
	myQuery += " FROM " + table_name;
	myQuery += " WHERE PharmacyID = ? ";

	pool.query
	(
		myQuery ,
		req.params.pharmacyID,
		function (err, rows, fields)
		{
			if (err)
				console.log(err);
			else
				res.json(rows);
		}
	);
};
