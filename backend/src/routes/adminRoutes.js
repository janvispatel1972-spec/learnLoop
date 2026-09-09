const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  getPendingTutors,
  getAllTutors,
  approveTutor,
  rejectTutor,
} = require("../controllers/adminController");

const router = express.Router();

// All admin routes require a valid token + admin role
router.use(authMiddleware, roleMiddleware("admin"));

router.get("/tutors/pending", getPendingTutors);   // GET /api/admin/tutors/pending
router.get("/tutors", getAllTutors);               // GET /api/admin/tutors
router.patch("/tutors/:id/approve", approveTutor); // PATCH /api/admin/tutors/:id/approve
router.patch("/tutors/:id/reject", rejectTutor);   // PATCH /api/admin/tutors/:id/reject

module.exports = router;
