const { Transaction, validate } = require("../models/transaction");
const { Member } = require("../models/member");
const { Partner } = require("../models/partner");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let member = await Member.findByIdAndUpdate(
    req.body.memberID,
    {
      points: req.body.sumOfPoints,
    },
    {
      new: true,
    }
  );
  if (!member) return res.status(400).send("Invalida member.");

  let partner = await Partner.findByIdAndUpdate(
    req.body.pid,
    {
      $inc: { allocatedPoints: req.body.points },
    },
    {
      new: true,
    }
  );

  if (!partner) return res.status(400).send("Invalid partner");

  const items = partner.items;
  const newItem = items.find((item) => item["_id"].equals(req.body.itemID));

  let transaction = new Transaction({
    member: {
      _id: req.body.memberID,
      accountNum: member.accountNum,
      email: member.email,
    },
    partner: {
      _id: partner._id,
      partnerID: req.body.partnerID,
      name: partner.name,
    },
    item: {
      _id: req.body.itemID,
      name: newItem.name,
    },
    points: req.body.points,
    type: "earned_points",
  });

  await transaction.save();

  res.send(member);
});

module.exports = router;
