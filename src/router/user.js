const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const { check } = require("express-validator");
// const auth = require("../middleware/auth");

// create new user
router.post(
  "/create",
  [
    check("firstName", "The firstName is required").not().isEmpty(),
    check("lastName", "The lastName is required").not().isEmpty(),
    check("email", "Add an email valid.").isEmail(),
    check(
      "password",
      "the password cannot be empty and must contain at least 6 characters."
    ).isLength({ min: 6 }),
    check("profile", "The profile is required").not().isEmpty(),
  ],
  userController.createUser
);

router.get("/getAllUsers", userController.getAllUsers);

module.exports = router;
