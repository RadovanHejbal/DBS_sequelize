const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Category = sequelize.define("category", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
});

module.exports = Category;