// var transport = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "5b373c07e7aee9",
//     pass: "7d3163507e4d4c",
//   },
// });

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const emailVerificationTokenSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
  },
  ref: "User",
  required: true,
  token: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    experries: 3600,
    default: Date.now(),
  },
});

emailVerificationTokenSchema.pre("save", async function () {
  if (this.isModified("token")) {
    this.token = await bcrypt.hash(this.token, 10);
  }
});
module.exports = mongoose.model(
  "EmailVerificationToken",
  emailVerificationTokenSchema
);
