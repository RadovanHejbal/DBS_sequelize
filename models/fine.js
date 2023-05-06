const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Fine = sequelize.define("fine", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT
  },
  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Fine;