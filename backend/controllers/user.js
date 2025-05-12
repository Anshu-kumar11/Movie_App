const mongoose = require("mongoose");
const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const nodemailer = require("nodemailer");
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

  let OTP = "";

  for (let i = 0; i <= 5; i++) {
    const val = Math.round(Math.random() * 9);
    OTP += val;
  }

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });
  await newEmailVerificationToken.save();
  // Looking to send emails in production? Check out our Email API/SMTP product!
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5b373c07e7aee9",
      pass: "7d3163507e4d4c",
    },
  });

  transport.sendMail({
    from: "verification@review.com",
    to: newUser.email,
    subject: "email verification",
    html: `<p>your verification token</p>
    <h1>opt is here ${OTP}</h1>
    `,
  });
  res.status(201).json({
    message: "please verify your email. otp has been send to your email!",
  });
};

exports.VerifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!mongoose.isValidObjectId(userId))
    return res.json({ error: "Invalid user " });

  const user = await User.findById(userId);

  if (!user) return res.json({ error: "user not found " });

  if (user.isVerified) return res.json({ error: "user already verified " });

  const token = EmailVerificationToken.findOne({ owner: userId });

  if (!token) return res.json({ error: "token not found " });
};
