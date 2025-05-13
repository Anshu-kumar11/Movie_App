const express = require("express");
const { createUser, VerifyEmail } = require("../controllers/user");
const { userValidator, validate } = require("../middlewares/validator");
const router = express.Router();

router.post("/create", userValidator, validate, createUser);
router.post("/verifyemail", VerifyEmail);

module.exports = router;
