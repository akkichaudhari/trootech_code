const Category = require("./category"); // Import the Category model
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type:  DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
  });
  Product.associate = (models) => {
    Product.belongsTo(models.category, {
      foreignKey: "category_id",
    });
  };
  return Product;
};
