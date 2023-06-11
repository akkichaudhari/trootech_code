const models = require("../models");
const productModels = models.product;

const addProduct = async (productDetail) => {
  try {
    return await productModels.create(productDetail);
  } catch (error) {
    console.log(error);
  }
};

const getAllProduct = async () => {
  try {
    return await productModels.findAll({
      distinct: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductDetail = async (condition) => {
  try {
    return await productModels.findOne({ where: condition });
  } catch (error) {
    console.log(error);
  }
};

const updateProductDetail = async (productDetail) => {
  try {
    return await productModels.update(productDetail, {
      where: { id: productDetail.id },
    });
  } catch (error) {
    console.log(error);
  }
};

const removeProduct = async (condition) => {
  try {
    return await productModels.destroy({ where: condition });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addProduct,
  getAllProduct,
  getProductDetail,
  updateProductDetail,
  removeProduct,
};
