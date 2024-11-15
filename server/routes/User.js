const express = require("express")
const router = express.Router()

const {
    login,
    signup,
  } = require("../controllers/Auth");

// Route for user signup
router.post("/signup", signup);

// Route for user login
router.post("/login", login);

// Export the router for use in the main application
module.exports = router