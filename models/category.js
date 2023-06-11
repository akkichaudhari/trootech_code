// models/user.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Category = sequelize.define(
    "category",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "category", key: "id" },
      },
    },
    {
      timestamps: false, // Disable automatic generation of createdAt and updatedAt fields
    }
  );

  return Category;
};
