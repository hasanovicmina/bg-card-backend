const Joi = require("joi");
const mongoose = require("mongoose");

const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
    },
    description: { type: String, required: true, minlength: 5, maxlength: 500 },
    pointsToEarn: { type: Number, required: true },
    pointsToRedeem: { type: Number, required: true },
    category: {
      type: String,
      enum: ["bronze", "silver", "gold"],
      //uppercase : true
    },
  })
);

function validateItem(item) {
  const schema = {
    name: Joi.string().min(5).max(100).required(),
    description: Joi.string().min(5).max(500).required(),
    pointsToEarn: Joi.number().required(),
    pointsToRedeem: Joi.number().required(),
    category: Joi.string().required(),
  };

  return Joi.validate(customer, schema);
}

exports.Item = Item;
exports.validate = validateItem;
