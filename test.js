const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello world");
});

const { Partner } = require("./models/partner");

async function getPartners() {
  const partners = await Partner.find().sort("name");

  console.log(partners);
}
getPartners();

app.listen(3900);
