
require('dotenv').config({ path: `${process.cwd()}/.env` });

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "database_development",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "test_workout",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};




