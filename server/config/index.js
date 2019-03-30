require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV || "dev",
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
  }
};
