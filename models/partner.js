const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const itemScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
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
});

const partnerSchema = new mongoose.Schema({
  partnerID: {
    type: String,
    required: true,
    //unique: true,
    minlength: 5,
    maxlength: 255,
  },
  accessCardID: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  allocatedPoints: {
    type: Number,
    default: 0,
  },
  redeemedPoints: {
    type: Number,
    default: 0,
  },
  items: [itemScheme],
});
//enum, match, lowercase - transform string to lowercase, trim
partnerSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      partnerID: this.partnerID,
      accessCardID: this.accessCardID,
      name: this.name,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};
const Partner = mongoose.model("Partner", partnerSchema);

function validatePartner(partner) {
  const schema = {
    partnerID: Joi.string().min(5).max(50).required(),
    accessCardID: Joi.string().min(5).max(50).required(),
    name: Joi.string().min(2).max(100).required(),
    allocatedPoints: Joi.number(),
    redeemedPoints: Joi.number(),
  };
  return Joi.validate(partner, schema);
}

exports.Partner = Partner;
exports.validate = validatePartner;
