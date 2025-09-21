import { Sequelize } from "sequelize";
import config from "./config.cjs";

const env = process.env.NODE_ENV || "test";
const sequelize = new Sequelize(config[env]);

// ✅ Check connection here
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error.message);
  }
})();

export default sequelize;
