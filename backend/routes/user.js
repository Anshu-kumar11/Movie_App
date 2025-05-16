const express = require("express");
const {
  createUser,
  VerifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
} = require("../controllers/user");
const { userValidator, validate } = require("../middlewares/validator");
const router = express.Router();

router.post("/create", userValidator, validate, createUser);
router.post("/verifyemail", VerifyEmail);
router.post("/resendverification", resendEmailVerificationToken);
router.post("/forgetpassword", forgetPassword);

module.exports = router;
