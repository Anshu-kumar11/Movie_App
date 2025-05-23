const nodemailer = require("nodemailer");
exports.generateOTP = (otp_length = 6) => {
  let OTP = "";
  for (let i = 1; i <= otp_length; i++) {
    const val = Math.floor(Math.random() * 10);
    OTP += val;
  }
  return OTP;
};

exports.generateMailTransporter = () => {
  return nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });
};
