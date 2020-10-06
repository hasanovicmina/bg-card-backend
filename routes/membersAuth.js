const { Member } = require("../models/member");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let member = await Member.findOne({
    accountNum: req.body.accountNum,
    accessCardID: req.body.accessCardID,
  });
  if (!member)
    return res.status(400).send("Invalid account number or accessCardID");

  const token = member.generateAuthToken();
  res.send(token);
});

module.exports = router;
