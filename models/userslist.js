const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const UsersList = sequelize.define("userslist", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = UsersList;