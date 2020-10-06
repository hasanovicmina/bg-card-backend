const { Member, validate } = require("../models/member");
const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  const member = await Member.findById(req.params.id);

  if (!member)
    return res.status(404).send("The member with the given ID was not found.");
  res.send(member);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let member = await Member.findOne({ accountNum: req.body.accountNum });
  if (member)
    return res
      .status(400)
      .send("Member with that account number is already registered.");

  member = new Member({
    accountNum: req.body.accountNum,
    accessCardID: req.body.accessCardID,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });

  await member.save();
  const token = member.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(member);
});

router.put("/:id", async (req, res) => {
  const member = await Member.findByIdAndUpdate(
    req.params.id,
    {
      points: req.body.points,
    },
    {
      new: true,
    }
  );
  if (!member)
    return res.status(404).send("The member with the given ID was not found.");

  res.send(member);
});

module.exports = router;
