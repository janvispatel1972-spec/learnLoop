/**
 * Seed Script — creates or resets demo accounts for all roles.
 * Run with: node src/scripts/seedAdmin.js
 *
 * Accounts created:
 *   Admin  → admin@learnloop.com   / Admin@123
 *   Tutor  → tutor@learnloop.com   / Tutor@123
 *   Learner→ learner@learnloop.com / Learn@123
 */

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const DEMO_ACCOUNTS = [
  { name: "Admin",          email: "admin@learnloop.com",   password: "Admin@123",  role: "admin"   },
  { name: "Tutor Demo",     email: "tutor@learnloop.com",   password: "Tutor@123",  role: "tutor"   },
  { name: "Learner Demo",   email: "learner@learnloop.com", password: "Learn@123",  role: "learner" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    for (const account of DEMO_ACCOUNTS) {
      const hashedPassword = await bcrypt.hash(account.password, 10);

      const result = await User.findOneAndUpdate(
        { email: account.email },
        {
          name: account.name,
          email: account.email,
          password: hashedPassword,
          role: account.role,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`  [${account.role.toUpperCase()}]  ${account.email}  →  ${account.password}  (${result._id})`);
    }

    console.log("\n🎉 Seeding complete!");
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
