const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const PublicationAuthor = sequelize.define("publicationauthor", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = PublicationAuthor;