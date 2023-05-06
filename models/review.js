const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Review = sequelize.define("review", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Review;