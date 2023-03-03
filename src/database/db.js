require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../../config/database");
const env = process.env.NODE_ENV || 'development';
const db = {};
db.connection = new Sequelize(
  config['development'].database,
  config['development'].username,
  config['development'].password,
  {
    host: config['development'].host,
    dialect: config['development'].dialect,
    logging: false
  }
);
// models
db.User = require('../models/User')(db.connection, DataTypes);
db.Entity = require('../models/Entity')(db.connection, DataTypes);
module.exports = db;
