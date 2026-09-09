const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: "You are authenticated",
        user: req.user,
    });
});
module.exports = router;