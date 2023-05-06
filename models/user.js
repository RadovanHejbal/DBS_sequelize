const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  personal_identificator: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING(40),
  },
  birth_date: {
    type: DataTypes.DATE,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
        isEmail: true
    }
  },
  childemail_id: {
    type: DataTypes.STRING,
    validate: {
        isEmail: true
    }
  },
  card_id: {
    type: DataTypes.UUID,
  },
});

module.exports = User;
