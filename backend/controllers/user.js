const mongoose = require("mongoose");
const User = require("../models/user");
const EmailVerificationToken = require("../models/emailVerificationToken");
const nodemailer = require("nodemailer");
const { generateOTP, generateMailTransporter } = require("../utils/mail");
const { sendError } = require("../utils/helper");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return sendError(res, "User already created");
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    let OTP = generateOTP();

    const newEmailVerificationToken = new EmailVerificationToken({
      owner: newUser._id,
      token: OTP,
    });
    await newEmailVerificationToken.save();

    const transport = generateMailTransporter();

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
    return sendError(res, "Something went wrong. Try again later.");
  }
};

exports.VerifyEmail = async (req, res) => {
  try {
    const { userId, OTP } = req.body;

    if (!mongoose.isValidObjectId(userId))
      return sendError(res, "Invalid user");
    const user = await User.findById(userId);
    if (!user) return sendError(res, "User not found");

    if (user.isVerified) return sendError(res, "User already verified");

    const token = await EmailVerificationToken.findOne({ owner: userId });
    if (!token) return sendError(res, "Token not found");
    const isMatched = await token.compareToken(OTP);
    if (!isMatched) return sendError(res, "Please submit a valid OTP");
    user.isVerified = true;
    await user.save();

    await EmailVerificationToken.findByIdAndDelete(token._id);

    const transport = generateMailTransporter();

    await transport.sendMail({
      from: "verification@review.com",
      to: user.email, // corrected this line
      subject: "Welcome Email",
      html: `<h1>Welcome to our app and thanks for choosing us!</h1>`,
    });

    return res.status(200).json({ message: "Your email has been verified." });
  } catch (error) {
    console.error("Error in VerifyEmail:", error);
    return sendError(res, "Something went wrong. Try again later.");
  }
};

exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) return sendError(res, "user not found");

  if (user.isVerified)
    return res.json({ message: "this email is already verified!" });

  const alreadyHasToken = await EmailVerificationToken.findOne({
    owner: userId,
  });
  if (alreadyHasToken)
    return res.json({
      error: "only after one hour you can request for another token",
    });

  let OTP = generateOTP();

  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });
  await newEmailVerificationToken.save();

  const transport = generateMailTransporter();

  await transport.sendMail({
    from: "verification@review.com",
    to: user.email,
    subject: "Email Verification",
    html: `<p>Your verification token:</p>
    <h1>${OTP}</h1>`,
  });

  res.json({ message: "new otp has sent to you email!" });
};
