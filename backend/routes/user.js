const express = require("express");
const {
  createUser,
  VerifyEmail,
  resendEmailVerificationToken,
} = require("../controllers/user");
const { userValidator, validate } = require("../middlewares/validator");
const router = express.Router();

router.post("/create", userValidator, validate, createUser);
router.post("/verifyemail", VerifyEmail);
router.post("/resendverification", resendEmailVerificationToken);

module.exports = router;
