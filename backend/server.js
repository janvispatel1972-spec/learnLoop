const dotenv = require("dotenv");
const app = require("./src/app");
const connectDB = require("./src/config/db");
const seedDemoUsers = require("./src/utils/seedDemoUsers");

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedDemoUsers();

  app.listen(PORT, () => {
    console.log(`LearnLoop server running on port ${PORT}`);
  });
};

startServer();