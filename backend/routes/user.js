const express = require("express");
const {
  createUser,
  VerifyEmail,
  resendEmailVerificationToken,
  forgetPassword,
  sendResetPasswordTokenStatus,
  resetPassword,
  signIn,
} = require("../controllers/user");
const {
  userValidator,
  validate,
  validatePassword,
  signInValidator,
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
router.post("/sign-in", signInValidator, validate, signIn);

module.exports = router;
