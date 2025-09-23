/*mport dotenv from "dotenv";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//study this
dotenv.config({path: path.join(__dirname, '../.env')})

import { Sequelize } from 'sequelize';
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  }
);
//study this
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log(' Connection has been established successfully.');
  } catch (error) {
    console.error(' Unable to connect to the database:', error);
  }
}

testConnection();
*/