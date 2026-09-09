const bcrypt = require("bcryptjs");
const User = require("../models/user");

const demoUsers = [
  { name: "Demo Learner", email: "learner@learnloop.com", password: "password123", role: "learner" },
  { name: "Demo Tutor", email: "tutor@learnloop.com", password: "password123", role: "tutor" },
  { name: "Demo Admin", email: "admin@learnloop.com", password: "password123", role: "admin" },
];

const seedDemoUsers = async () => {
  for (const user of demoUsers) {
    const exists = await User.findOne({ email: user.email });
    if (exists) continue;

    const hashedPassword = await bcrypt.hash(user.password, 10);
    await User.create({ ...user, password: hashedPassword });
    console.log(`Demo user created: ${user.email} (${user.role})`);
  }
};

module.exports = seedDemoUsers;
