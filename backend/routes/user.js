const express = require("express");
const { createUser } = require("../controllers/user");
const { userValidator, validate } = require("../middlewares/validator");
const router = express.Router();

router.post("/create", userValidator, validate, createUser);

module.exports = router;
