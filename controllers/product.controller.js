const Joi = require("joi");
const productService = require("./../services/product.service");
var { Op } = require("sequelize");

const getProductList = async (req, res) => {
  try {
    const rows = await productService.getAllProduct();
    return res.status(200).json({
      status: "success",
      status_code: 200,
      data: rows,
    });
  } catch (error) {
    console.log("error-->", error);
    res.status(500).json({
      status: "fail",
      status_code: 500,
      error: error,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const { body } = req;
    const authSchema = Joi.object().keys({
      name: Joi.string().min(2).max(120).required(),
      categoryIds: Joi.array().required(),
      price: Joi.number().required(),
    });
    let { value, error } = authSchema.validate(body);
    if (error) {
      return res.status(422).json({
        status: "fail",
        status_code: 422,
        error: error.details[0].message,
      });
    }
    // let productExist = await productService.getProductById({
    //   name: value.name,
    // });
    // if (productExist) {
    //   return res.status(403).json({
    //     status: "fail",
    //     status_code: 403,
    //     error: "Product already exists",
    //   });
    // }
    let newProduct = await productService.addProduct(value);
    if (!newProduct) {
      return res.status(403).json({
        status: "fail",
        status_code: 403,
        error: "Add product  failed",
      });
    }
    res.status(200).json({
      status: "success",
      status_code: 200,
      message: "Product created successfull",
    });
  } catch (error) {
    console.log("error-->", error);
    res.status(500).json({
      status: "fail",
      status_code: 500,
      error: error,
    });
  }
};

const getDetailProduct = async (req, res) => {
  try {
    const product = await productService.getProductById({
      id: req.params.id,
    });
    return res
      .status(200)
      .json({ status: "success", status_code: 200, data: product });
  } catch (error) {
    console.log("error-->", error);
    res.status(500).json({
      status: "fail",
      status_code: 500,
      error: error,
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await productService.removeProduct({
      id: req.params.id,
    });
    if (product)
      return res.status(200).json({
        status: "success",
        status_code: 200,
        message: "PRODUCT_CATEGORY.REMOVE_PRODUCT_CATEGORY",
      });
    return res.status(500).json({
      status: "fail",
      status_code: 500,
      error: "COMMON_ERROR",
    });
  } catch (error) {
    console.log("error-->", error);
    res.status(500).json({
      status: "fail",
      status_code: 500,
      error: error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { body } = req;
    const authSchema = Joi.object().keys({
      name: Joi.string().min(2).max(120).required(),
      parrent_Id: Joi.number().optional(),
    });
    let { value, error } = authSchema.validate(body);
    if (error) {
      return res.status(422).json({
        status: "fail",
        status_code: 422,
        error: error.details[0].message,
      });
    }

    const condition = {
      [Op.and]: [{ name: value.name }, { id: { [Op.not]: req.params.id } }],
    };
    let productExist = await productService.getProductById(condition);
    if (productExist) {
      return res.status(403).json({
        status: "fail",
        status_code: 403,
        error: "PRODUCT_CATEGORY.CATEGORY_TITLE_EXIST",
      });
    }
    value.id = parseInt(req.params.id);
    let updatedProduct = await productService.updateProductById(value);
    if (updatedProduct[0] === 1)
      return res.status(200).json({
        status: "success",
        status_code: 200,
        message: "PRODUCT_CATEGORY.UPDATE_PRODUCT_CATEGORY_SUCCESS",
      });
    return res.status(500).json({
      status: "fail",
      status_code: 500,
      error: "PRODUCT_CATEGORY.UPDATE_PRODUCT_CATEGORY_FAIL",
    });
  } catch (error) {
    console.log("error-->", error);
    res.status(500).json({
      status: "fail",
      status_code: 500,
      error: error,
    });
  }
};

module.exports = {
  getProductList,
  addProduct,
  getDetailProduct,
  removeProduct,
  updateProduct,
};
