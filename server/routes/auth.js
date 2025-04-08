const express = require("express");
const router = express.Router();
const { login } = require("../controller/authController");
const { register } = require("../controller/authController");

router.post("/login", login);
router.post("/register", register);
module.exports = router;
