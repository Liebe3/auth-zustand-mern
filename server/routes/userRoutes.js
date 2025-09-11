const express = require("express");
const { authenticateToken, requireRole } = require("../middleware/verifyToken");

const router = express.Router();

// Protected route - requires authentication
router.get("/profile", authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

router.get("/admin", authenticateToken, requireRole(["admin"]), (req, res) => {
  res.json({
    success: true,
    message: "Admin access granted",
  });
});

module.exports = router;
