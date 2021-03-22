const pool = require("../database.js");

const tableName1 = "delivery_agent";

exports.profile = (request, response) =>
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
				console.log(error);
			else
				response.send(result);
		}
	);
};
