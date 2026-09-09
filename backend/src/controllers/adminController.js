const User = require("../models/user");

/**
 * GET /api/admin/tutors/pending
 * Returns all tutor accounts awaiting approval
 */
const getPendingTutors = async (req, res) => {
  try {
    const tutors = await User.find({ role: "tutor", isApproved: false })
      .select("-password -resetPasswordToken -resetPasswordExpires")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, tutors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch pending tutors", error: error.message });
  }
};

/**
 * GET /api/admin/tutors
 * Returns all tutor accounts (approved + pending)
 */
const getAllTutors = async (req, res) => {
  try {
    const tutors = await User.find({ role: "tutor" })
      .select("-password -resetPasswordToken -resetPasswordExpires")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, tutors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch tutors", error: error.message });
  }
};

/**
 * PATCH /api/admin/tutors/:id/approve
 * Approves a tutor account
 */
const approveTutor = async (req, res) => {
  try {
    const tutor = await User.findOneAndUpdate(
      { _id: req.params.id, role: "tutor" },
      { isApproved: true },
      { returnDocument: "after" }
    ).select("-password");

    if (!tutor) {
      return res.status(404).json({ success: false, message: "Tutor not found" });
    }

    res.status(200).json({ success: true, message: `${tutor.name} has been approved`, tutor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Approval failed", error: error.message });
  }
};

/**
 * PATCH /api/admin/tutors/:id/reject
 * Rejects (deletes) a tutor account
 */
const rejectTutor = async (req, res) => {
  try {
    const tutor = await User.findOneAndDelete({ _id: req.params.id, role: "tutor" });

    if (!tutor) {
      return res.status(404).json({ success: false, message: "Tutor not found" });
    }

    res.status(200).json({ success: true, message: `${tutor.name}'s application has been rejected and removed` });
  } catch (error) {
    res.status(500).json({ success: false, message: "Rejection failed", error: error.message });
  }
};

module.exports = { getPendingTutors, getAllTutors, approveTutor, rejectTutor };
