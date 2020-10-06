const { Partner } = require("../models/partner");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let partner = await Partner.findOne({
    partnerID: req.body.partnerID,
    accessCardID: req.body.accessCardID,
  });
  if (!partner)
    return res.status(400).send("Invalid partnerID or accessCardID");

  const token = partner.generateAuthToken();
  res.send(token);
});

module.exports = router;
