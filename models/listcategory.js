const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const ListCategory = sequelize.define("listcategory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING
  }
});

module.exports = ListCategory;