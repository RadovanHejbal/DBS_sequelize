const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Card = sequelize.define("card", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    magstripe: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
    },
})

module.exports = Card;