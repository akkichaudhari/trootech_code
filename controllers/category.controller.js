const Joi = require("joi");
const  productCategoryService = require("./../services/category.service");

const getCategoryList = async (req, res) => {
  try {
    const { rows: categories } =
      await productCategoryService.getAllProductCategory();
    return res.status(200).json({
      status: "success",
      status_code: 200,
      data: categories,
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
      description: Joi.string().optional(),
      parrentId: Joi.number(),
    });
    let { value, error } = authSchema.validate(body);
    if (error) {
      return res.status(422).json({
        status: "fail",
        status_code: 422,
        error: error.details[0].message,
      });
    }
    value.user_id = req.user.id;
    let productCategoryExist =
      await productCategoryService.getProductCategoryDetail({
        name: value.name,
      });
    if (productCategoryExist) {
      return res.status(403).json({
        status: "fail",
        status_code: 403,
        error: req.i18n.__("PRODUCT_CATEGORY.CATEGORY_TITLE_EXIST"),
      });
    }
    let newProductCategory = await productCategoryService.addProductCategory(
      value
    );
    if (!newProductCategory) {
      return res.status(403).json({
        status: "fail",
        status_code: 403,
        error: req.i18n.__("PRODUCT_CATEGORY.ADD_PRODUCT_CATEGORY_FAIL"),
      });
    }
    res.status(200).json({
      status: "success",
      status_code: 200,
      message: req.i18n.__("PRODUCT_CATEGORY.ADD_PRODUCT_CATEGORY_SUCCESS"),
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

// const getDetailProductCategory = catchAsync(async (req, res) => {
//   try {
//     const productCategory =
//       await productCategoryService.getProductCategoryDetail({
//         id: req.params.id,
//       });
//     return res
//       .status(200)
//       .json({ status: "success", status_code: 200, data: productCategory });
//   } catch (error) {
//     console.log("error-->", error);
//     res.status(500).json({
//       status: "fail",
//       status_code: 500,
//       error: error,
//     });
//   }
// });

// const removeProductCategory = catchAsync(async (req, res) => {
//   try {
//     const productCategory = await productCategoryService.removeProductCategory({
//       id: req.params.id,
//     });
//     if (productCategory === 1)
//       return res.status(200).json({
//         status: "success",
//         status_code: 200,
//         message: req.i18n.__("PRODUCT_CATEGORY.REMOVE_PRODUCT_CATEGORY"),
//       });
//     return res.status(500).json({
//       status: "fail",
//       status_code: 500,
//       error: req.i18n.__("COMMON_ERROR"),
//     });
//   } catch (error) {
//     console.log("error-->", error);
//     res.status(500).json({
//       status: "fail",
//       status_code: 500,
//       error: error,
//     });
//   }
// });

// const updateProductCategory = catchAsync(async (req, res) => {
//   try {
//     const { body } = req;
//     const authSchema = Joi.object().keys({
//       name: Joi.string().min(2).max(120).required(),
//       description: Joi.string().optional(),
//       default: Joi.boolean().optional().default(false),
//     });
//     let { value, error } = authSchema.validate(body);
//     if (error) {
//       return res.status(422).json({
//         status: "fail",
//         status_code: 422,
//         error: error.details[0].message,
//       });
//     }
//     let condition = {
//       [Op.and]: [{ name: value.name }, { id: { [Op.not]: req.params.id } }],
//     };
//     let productCategoryExist =
//       await productCategoryService.getProductCategoryDetail(condition);
//     if (productCategoryExist) {
//       return res.status(403).json({
//         status: "fail",
//         status_code: 403,
//         error: req.i18n.__("PRODUCT_CATEGORY.CATEGORY_TITLE_EXIST"),
//       });
//     }
//     value.id = parseInt(req.params.id);
//     let updatedProductCategory =
//       await productCategoryService.updateProductCategoryDetail(value);
//     if (updatedProductCategory[0] === 1)
//       return res.status(200).json({
//         status: "success",
//         status_code: 200,
//         message: req.i18n.__(
//           "PRODUCT_CATEGORY.UPDATE_PRODUCT_CATEGORY_SUCCESS"
//         ),
//       });
//     return res.status(500).json({
//       status: "fail",
//       status_code: 500,
//       error: req.i18n.__("PRODUCT_CATEGORY.UPDATE_PRODUCT_CATEGORY_FAIL"),
//     });
//   } catch (error) {
//     console.log("error-->", error);
//     res.status(500).json({
//       status: "fail",
//       status_code: 500,
//       error: error,
//     });
//   }
// });

module.exports = {
  getCategoryList,
  addProductCategory,
//   getDetailProductCategory,
//   removeProductCategory,
//   updateProductCategory,
};
