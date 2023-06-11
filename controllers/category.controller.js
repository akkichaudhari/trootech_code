const Joi = require("joi");
const productCategoryService = require("./../services/category.service");
var { Op } = require("sequelize");

const getCategoryList = async (req, res) => {
  try {
    const rows = await productCategoryService.getAllProductCategory();
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

const addProductCategory = async (req, res) => {
  try {
    const { body } = req;
    const authSchema = Joi.object().keys({
      name: Joi.string().min(2).max(120).required(),
      parent_id: Joi.number().optional(),
    });
    let { value, error } = authSchema.validate(body);
    if (error) {
      return res.status(422).json({
        status: "fail",
        status_code: 422,
        error: error.details[0].message,
      });
    }
    let productCategoryExist =
      await productCategoryService.getProductCategoryById({
        name: value.name,
      });
    if (productCategoryExist) {
      return res.status(403).json({
        status: "fail",
        status_code: 403,
        error: "Category already exists",
      });
    }
    let newProductCategory = await productCategoryService.addProductCategory(
      value
    );
    if (!newProductCategory) {
      return res.status(403).json({
        status: "fail",
        status_code: 403,
        error: "Add product category failed",
      });
    }
    res.status(200).json({
      status: "success",
      status_code: 200,
      message: "Category created successfull",
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

const getDetailProductCategory = async (req, res) => {
  try {
    const productCategory = await productCategoryService.getProductCategoryById(
      {
        id: req.params.id,
      }
    );
    return res
      .status(200)
      .json({ status: "success", status_code: 200, data: productCategory });
  } catch (error) {
    console.log("error-->", error);
    res.status(500).json({
      status: "fail",
      status_code: 500,
      error: error,
    });
  }
};

const removeProductCategory = async (req, res) => {
  try {
    const productCategory = await productCategoryService.removeProductCategory({
      id: req.params.id,
    });
    if (productCategory === 1)
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

const updateProductCategory = async (req, res) => {
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
    let productCategoryExist =
      await productCategoryService.getProductCategoryById(condition);
    if (productCategoryExist) {
      return res.status(403).json({
        status: "fail",
        status_code: 403,
        error: "PRODUCT_CATEGORY.CATEGORY_TITLE_EXIST",
      });
    }
    value.id = parseInt(req.params.id);
    let updatedProductCategory =
      await productCategoryService.updateProductCategoryById(value);
    if (updatedProductCategory[0] === 1)
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
  getCategoryList,
  addProductCategory,
  getDetailProductCategory,
  removeProductCategory,
  updateProductCategory,
};
