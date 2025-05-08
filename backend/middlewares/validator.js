const { check, validationResult } = require("express-validator");
exports.userValidator = [
  check("name").trim().not().isEmpty().withMessage("name is missing"),
  check("email").normalizeEmail().isEmail().withMessage("email is invalid!"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 8, max: 20 })
    .withMessage("email is invalid!"),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    res.json({ error: error[0].msg });
  }
  next();
};
