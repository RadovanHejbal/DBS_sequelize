const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Book = sequelize.define("book", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publisher: {
    type: DataTypes.STRING
  },
  year: {
    type: DataTypes.INTEGER
  },
  status: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: false
});

module.exports = Book;