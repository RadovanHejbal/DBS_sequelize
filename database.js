const Sequelize = require('sequelize');
require("dotenv").config();

const dbName = process.env.DATABASE_NAME;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;
const dbUser = process.env.DATABASE_USER;
const dbPort = process.env.DATABASE_PORT;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'postgres',
});

module.exports = sequelize;