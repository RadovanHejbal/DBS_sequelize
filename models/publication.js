const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Publication = sequelize.define("publication", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = Publication;