const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/belgrade-card")
    .then(() => console.log("connected"));
};
