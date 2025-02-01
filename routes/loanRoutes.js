const express = require("express");
const authController = require("../controllers/auth.controller");
const loanController = require("../controllers/loan_controller");
const router = express.Router();

router.post("/", authController.routeProtect, loanController.createLoan);

module.exports = router;
