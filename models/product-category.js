// models/user.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const ProdCategory = sequelize.define(
    "product_categories",
    {
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "product",
          key: "id",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "category",
          key: "id",
        },
      },
    },
    {
      timestamps: false, // Disable automatic generation of createdAt and updatedAt fields
    }
  );

  return ProdCategory;
};
