const { Partner, validate } = require("../models/partner");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const partners = await Partner.find().sort("name");
  res.send(partners);
});

router.get("/:id", async (req, res) => {
  const partner = await Partner.findById(req.params.id);
  console.log(partner);

  if (!partner)
    return res.status(404).send("The partner with the given ID was not found.");
  res.send(partner);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let partner = await Partner.findOne({ partnerID: req.body.partnerID });
  if (partner)
    return res
      .status(400)
      .send("Partner with that partnerID is already registered.");

  partner = new Partner({
    partnerID: req.body.partnerID,
    accessCardID: req.body.accessCardID,
    name: req.body.name,
    items: [],
  });

  await partner.save();
  const token = partner.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(partner);
});

router.put("/:id", async (req, res) => {
  let partner = await Partner.findById(req.params.id);
  if (!partner) {
    return res.status(404).send("The partner with the given ID was not found.");
  }
  let newItems = [...partner.items];
  console.log("ITEMS TO ADD : " + req.body);

  newItems.push(req.body);
  partner = await Partner.findByIdAndUpdate(
    req.params.id,
    {
      items: newItems,
    },
    {
      new: true,
    }
  );
  res.send(partner);
});

module.exports = router;
