var express = require('express');
var router = express.Router();
const category = require('./category.route')
// router.use("/products", ProductRoutes);

router.use("/category", category);

module.exports = router;
