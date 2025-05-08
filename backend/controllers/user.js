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
  res.status(201).json({ user: newUser });
};
