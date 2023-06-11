
const ProductCategoryController=require('./../controllers/category.controller')
const express = require("express")
const router = express.Router();
router.route('/category/add').post(ProductCategoryController.addProductCategory)
router.route('/category/list').get(ProductCategoryController.getCategoryList);
// router.route('/category/detail/:id').get(ProductCategoryController.getDetailProductCategory);
// router.route('/category/:id').delete(ProductCategoryController.removeProductCategory);
// router.route('/category/update/:id').put(ProductCategoryController.updateProductCategory);

module.exports = router;