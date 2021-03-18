const pool = require("../database.js");

exports.features = (req, res) => 
{
	const available =
	[
		"database/tableName/describe",
		"database/tableName/showAllRows",
		"database/tableName/showAllColumnNames"
	]; 

	res.send(available);
};

exports.describeTable = (req, res) =>
{
	const myQuery = "DESCRIBE " + "'" +req.params.tableName + "'" + ";";	

	pool.query
	(
		myQuery , 
		function (err, rows, fields)
		{
			if (err)
				console.log(err);
			else
				res.json(rows);
		}
	);
};

exports.showTableAllRows = (req, res) =>
{
	const myQuery = "SELECT * FROM " + "'" +req.params.tableName + "'" + ";";	

	pool.query
	(
		myQuery , 
		function (err, rows, fields)
		{
			if (err)
				console.log(err);
			else
				res.json(rows);
		}
	);
};

exports.showTableAllColumnNames = (req, res) =>
{
	const myQuery = "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = " + "'" +req.params.tableName + "'" + ";";

	pool.query
	(
		myQuery , 
		function (err, rows, fields)
		{
			if (err)
				console.log(err);
			else
				res.json(rows);
		}
	);
};
