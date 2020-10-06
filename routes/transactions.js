const { Transaction, validate } = require("../models/transaction");
const { Member } = require("../models/member");
const { Partner } = require("../models/partner");
const express = require("express");
const router = express.Router();

router.get("/member/:id", async (req, res) => {
  const transactions = await Transaction.find({
    "member._id": req.params.id,
  }).sort("-date");

  res.send(transactions);
});

router.get("/partner/:id", async (req, res) => {
  const transactions = await Transaction.find({
    "partner._id": req.params.id,
  }).sort("-date");
  console.log(transactions, "transactions");

  res.send(transactions);
});

// router.get("/partner/:id", async (req, res) => {
//   const transactions = await Transaction.aggregate([
//     {
//       $match: { "partner._id": { $eq: req.params.id } },
//     },
//     {
//       $addFields: {
//         formatedDate: {
//           $dateToString: {
//             format: "%d-%m-%Y %H:%M:%S",
//             date: "$date",
//           },
//         },
//       },
//     },
//     {
//       $sort: {
//         date: 1,
//       },
//     },
//   ]);
//   console.log("TRANSACTIONS", transactions);

//   res.send(transactions);
// });

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const member = await Member.findById(req.body.memberID);
  if (!member) return res.status(400).send("Invalida member.");

  const partner = await Partner.findById(req.body.partnerID);
  if (!partner) return res.status(400).send("Invalid partner");

  let earnedPoints = 0;
  let redeemedPoints = 0;
  if (req.body.earnedPoints) {
    earnedPoints = req.body.earnedPoints;
  } else {
    redeemedPoints = req.body.redeemedPoints;
  }

  let transaction = new Transaction({
    member: {
      // _id = member._id,
      accountNum: member.accountNum,
      email: member.email,
    },
    partner: {
      // _id = partner._id,
      partnerID: partner.partnerID,
    },
    item: {
      // _id = req.body.item._id,
      name: req.body.item.name,
    },
    earnedPoints: earnedPoints,
    redeemedPoints: redeemedPoints,
  });
  await transaction.save();
  res.send(transaction);
});

module.exports = router;
