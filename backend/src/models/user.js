const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["learner", "tutor", "admin"],
      default: "learner",
    },

    isApproved: {
      type: Boolean,
      default: true, // false is set in pre-save hook for tutors
    },

    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Auto-set isApproved=false for new tutor accounts
userSchema.pre("save", function (next) {
  if (this.isNew && this.role === "tutor") {
    this.isApproved = false;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;