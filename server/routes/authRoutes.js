// authRoutes.js

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Adjust the path as necessary

router.get("/github", authController.githubAuth);
router.get("/github/callback", authController.githubCallback);

module.exports = router;
