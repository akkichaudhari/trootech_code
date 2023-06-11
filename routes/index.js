var express = require('express');
var router = express.Router();
const categories = require('./category.route')
// router.use("/products", ProductRoutes);

router.use("/category", categories);

module.exports = router;
