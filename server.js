const express = require("express");
const pool = require("./database");
const app = express();

app.use("/", require("./routes/hello"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
    console.log(`Express server is running on Port: ${PORT}`)
);
