const express = require("express");
const {
  createUser,
  VerifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
} = require("../controllers/user");
const {
  userValidator,
  validate,
  validatePassword,
} = require("../middlewares/validator");
const { isValidPassResetToken } = require("../middlewares/user");
const router = express.Router();

router.post("/create", userValidator, validate, createUser);
router.post("/verifyemail", VerifyEmail);
router.post("/resendverification", resendEmailVerificationToken);
router.post("/forgetpassword", forgetPassword);
router.post(
  "/verify-pasword-reset-token",
  isValidPassResetToken,
  sendResetPasswordTokenStatus
);
router.post(
  "/reset-pasword",
  validatePassword,
  validate,
  isValidPassResetToken,
  resetPassword
);

module.exports = router;
