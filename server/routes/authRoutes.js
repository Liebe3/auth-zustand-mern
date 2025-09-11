const express = require("express");
const router = express.Router();
const {
  register,
  login,
  refreshToken,
  logout,
} = require("../controllers/authController");
const { authenticateToken } = require("../middleware/verifyToken");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout",authenticateToken, logout);

module.exports = router;
