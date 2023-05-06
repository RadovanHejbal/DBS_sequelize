const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const PublicationCategory = sequelize.define("publicationcategory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = PublicationCategory;