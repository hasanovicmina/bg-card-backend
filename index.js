const express = require("express");
const config = require("config");
const cors = require("cors");
const app = express();

const corsOptions = {
  exposedHeaders: ["x-auth-token"],
};

app.use(express.json());
app.use(cors(corsOptions));

const redeemPoints = require("./routes/redeemPoints");
app.use("/api/redeemPoints", redeemPoints);
const earnPoints = require("./routes/earnPoints");
app.use("/api/earnPoints", earnPoints);
const transactions = require("./routes/transactions");
app.use("/api/transactions", transactions);
const partnersAuth = require("./routes/partnersAuth");
app.use("/api/partnersAuth", partnersAuth);
const partners = require("./routes/partners");
app.use("/api/partners", partners);
const membersAuth = require("./routes/membersAuth");
app.use("/api/membersAuth", membersAuth);
const members = require("./routes/members");
app.use("/api/members", members);

require("./startup/db")();

const port = config.get("port");
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;
