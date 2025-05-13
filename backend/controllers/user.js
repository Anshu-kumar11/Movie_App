const mongoose = require("mongoose");
const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const nodemailer = require("nodemailer");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(401).json({ error: "User already created" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    let OTP = "";
    for (let i = 0; i <= 5; i++) {
      const val = Math.floor(Math.random() * 10);
      OTP += val;
    }

    const newEmailVerificationToken = new EmailVerificationToken({
      owner: newUser._id,
      token: OTP,
    });
    await newEmailVerificationToken.save();

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5b373c07e7aee9",
        pass: "7d3163507e4d4c",
      },
    });

    await transport.sendMail({
      from: "verification@review.com",
      to: newUser.email,
      subject: "Email Verification",
      html: `<p>Your verification token:</p>
      <h1>${OTP}</h1>`,
    });

    return res.status(201).json({
      message: "Please verify your email. OTP has been sent to your email!",
    });
  } catch (error) {
    console.error("Error in createUser:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Try again later." });
  }
};
exports.VerifyEmail = async (req, res) => {
  try {
    const { userId, OTP } = req.body;

    if (!mongoose.isValidObjectId(userId))
      return res.status(400).json({ error: "Invalid user" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ error: "User already verified" });

    const token = await EmailVerificationToken.findOne({ owner: userId });
    if (!token) return res.status(404).json({ error: "Token not found" });

    const isMatched = await token.compareToken(OTP);
    if (!isMatched)
      return res.status(400).json({ error: "Please submit a valid OTP" });

    user.isVerified = true;
    await user.save();

    await EmailVerificationToken.findByIdAndDelete(token._id);

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5b373c07e7aee9",
        pass: "7d3163507e4d4c",
      },
    });

    await transport.sendMail({
      from: "verification@review.com",
      to: user.email, // corrected this line
      subject: "Welcome Email",
      html: `<h1>Welcome to our app and thanks for choosing us!</h1>`,
    });

    return res.status(200).json({ message: "Your email has been verified." });
  } catch (error) {
    console.error("Error in VerifyEmail:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong. Try again later." });
  }
};
