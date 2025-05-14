exports.generateOTP = (otp_length = 6) => {
  let OTP = "";
  for (let i = 1; i <= otp_length; i++) {
    const val = Math.floor(Math.random() * 10);
    OTP += val;
  }
  return OTP;
};

exports.generateMailTransporter = () => {
  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5b373c07e7aee9",
      pass: "7d3163507e4d4c",
    },
  });
};
