const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Author = sequelize.define("author", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(40),
  },
  surname: {
    type: DataTypes.STRING(40),
  },
});

module.exports = Author;