const { Sequelize } = require("sequelize");
const config = require("../../config/database");
const db = {};

console.log("config", config);
db.connection = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
  }
);
console.log("config", config)
module.exports = db;
