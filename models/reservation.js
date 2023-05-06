const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Reservation = sequelize.define("reservation", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
})

module.exports = Reservation;