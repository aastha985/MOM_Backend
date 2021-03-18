const express = require("express");
const pool = require("./database");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
    session({
        key: "userId",
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

app.use("/", require("./routes/hello"));
app.use("/user", require("./routes/user"));
app.use("/medicine", require("./routes/medicine"));
app.use("/pharmacy", require("./routes/pharmacy"));
app.use("/medicineCompanies", require("./routes/medicineCompanies"));

app.use("/debugging",require("./routes/debugging"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
    console.log(`Express server is running on Port: ${PORT}`)
);
