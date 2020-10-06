const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const memberSchema = new mongoose.Schema({
  accountNum: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  accessCardID: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
});
memberSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      accountNum: this.accountNum,
      accessCardID: this.accessCardID,
      email: this.email,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Member = mongoose.model("Member", memberSchema);

function validateMember(member) {
  const schema = {
    accountNum: Joi.string().min(5).max(255).required(),
    accessCardID: Joi.string().min(5).max(255).required(),
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
  };
  return Joi.validate(member, schema);
}
exports.Member = Member;
exports.validate = validateMember;
