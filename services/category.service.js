const models = require("../models");
const productCategoryModels = models.category;

const addCategory = async (productCategoryDetail) => {
  try {
    return await productCategoryModels.create(productCategoryDetail);
  } catch (error) {
    console.log(error);
  }
};

const getAllCategory = async (condition, sort) => {
  try {
    return await productCategoryModels.findAll({
      distinct: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getCategoryById = async (id) => {
  try {
    return await productCategoryModels.findOne({ where: { id: id.id } });
  } catch (error) {
    console.log(error);
  }
};

const updateCategoryById = async (productCategoryDetail) => {
  try {
    return await productCategoryModels.update(productCategoryDetail, {
      where: { id: productCategoryDetail.id },
    });
  } catch (error) {
    console.log(error);
  }
};

const removeCategory = async (condition) => {
  try {
    return await productCategoryModels.destroy({ where: condition });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addCategory,
  getAllCategory,
  getCategoryById,
  updateCategoryById,
  removeCategory,
};
