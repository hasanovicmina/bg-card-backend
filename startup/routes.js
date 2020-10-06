//const express = require("express");
const partners = require("../routes/partners");

module.exports = function (app) {
  app.use("api/partners", partners);
};
