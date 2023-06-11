module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("product", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_id: {
        type:  Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "category",
          key: "id",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("product");
  },
};
