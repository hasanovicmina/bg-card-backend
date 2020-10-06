const mongoose = require("mongoose");
const Joi = require("joi");

const transactionSchema = new mongoose.Schema({
  member: {
    type: new mongoose.Schema({
      accountNum: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
      },
      email: {
        type: String,
        required: true,
      },
    }),
    required: true,
  },
  partner: {
    type: new mongoose.Schema({
      partnerID: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
      },
      name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true,
      },
    }),
    required: true,
  },
  item: {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
      trim: true,
    },
  },
  points: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

function validateTransaction(transaction) {
  const schema = {
    memberID: Joi.required(),
    partnerID: Joi.required(),
    pid: Joi.required(),
    itemID: Joi.required(),
    sumOfPoints: Joi.number().required(),
    points: Joi.number().required(),
    type: Joi.string(),
  };
  return Joi.validate(transaction, schema);
}
exports.Transaction = Transaction;
exports.validate = validateTransaction;
