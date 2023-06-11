
const ProductCategoryController=require('./../controllers/category.controller')
const express = require("express")
const router = express.Router();
router.route('/add').post(ProductCategoryController.addProductCategory)
router.route('/list').get(ProductCategoryController.getCategoryList);
router.route('/detail/:id').get(ProductCategoryController.getDetailProductCategory);
router.route('/:id').delete(ProductCategoryController.removeProductCategory);
router.route('/update/:id').put(ProductCategoryController.updateProductCategory);

module.exports = router;