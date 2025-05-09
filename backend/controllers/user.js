const mongoose = require("mongoose");
const User = require("../models/user");

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = new User({
    name,
    email,
    password,
  });
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.status(401).json({ error: "user already created" });
  }
  await newUser.save();

  // Looking to send emails in production? Check out our Email API/SMTP product!
  // var transport = nodemailer.createTransport({
  //   host: "sandbox.smtp.mailtrap.io",
  //   port: 2525,
  //   auth: {
  //     user: "5b373c07e7aee9",
  //     pass: "7d3163507e4d4c",
  //   },
  // });
  res.status(201).json({ user: newUser });
};
