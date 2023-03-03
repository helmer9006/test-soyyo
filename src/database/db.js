require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../../config/database");
const env = process.env.NODE_ENV || 'development';
const db = {};
console.log("env",env)
console.log("config", config[env].host);
db.connection = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  {
    host: config[env].host,
    dialect: config[env].dialect,
  }
);
// models
db.User = require('../models/User')(db.connection, DataTypes);
db.Entity = require('../models/Entity')(db.connection, DataTypes);
module.exports = db;
