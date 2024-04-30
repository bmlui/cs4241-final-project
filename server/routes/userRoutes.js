// userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getUser);
router.post("/add/:id", userController.addUser);
router.put("/update", userController.updateUserProfile);
router.post("/update/settings", userController.updateSettings);
router.post("/remove/:id", userController.removeUser);
router.get("/contacts", userController.getContacts);
router.get("/search", userController.searchUser);
router.get("/search/:id", userController.getUserByID);

module.exports = router;
