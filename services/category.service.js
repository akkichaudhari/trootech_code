const models = require("../models");
const productCategoryModels = models.category;

const addProductCategory = async (productCategoryDetail) => {
  try {
    return await productCategoryModels.create(productCategoryDetail);
  } catch (error) {
    console.log(error);
  }
};

const getAllProductCategory = async (condition, sort) => {
  try {
    return await productCategoryModels.findAll({
      distinct: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductCategoryById = async (id) => {
  try {
    return await productCategoryModels.findOne({ where: { id: id.id } });
  } catch (error) {
    console.log(error);
  }
};

const updateProductCategoryById = async (productCategoryDetail) => {
  try {
    return await productCategoryModels.update(productCategoryDetail, {
      where: { id: productCategoryDetail.id },
    });
  } catch (error) {
    console.log(error);
  }
};

const removeProductCategory = async (condition) => {
  try {
    return await productCategoryModels.destroy({ where: condition });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addProductCategory,
  getAllProductCategory,
  getProductCategoryById,
  updateProductCategoryById,
  removeProductCategory,
};
