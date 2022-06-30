const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our db
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'n4m3x5ti89xl6czh.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  dialect: 'mysql',
  port: 3306
});

module.exports = sequelize;