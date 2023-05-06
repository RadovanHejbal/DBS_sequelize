const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Rental = sequelize.define("rental", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    start_date: {
        type: DataTypes.DATE,
    },
    end_date: {
        type: DataTypes.DATE,
    },
    status: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: false
})

module.exports = Rental;