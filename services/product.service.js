const models = require("../models");
const productModels = models.product;


const addProductCategory = async (productCategoryDetail) => {
    try {
        return await productModels.create(productCategoryDetail);
    }
    catch (error) {
        console.log(error);
    }
}

const getAllProductCategory = async (condition, pageDetail, sort) => {
    try {
        if (!pageDetail) {
            pageDetail = { page: 0, pageSize: 10 }
        }

        if (!sort) {
            sort = { order: [["createdAt", 'DESC']] };
        }
        return await productModels.findAll({
            where: condition,
            sort,
            distinct: true
        }, pageDetail);
    }
    catch (error) {
        console.log(error);
    }
}

const getProductCategoryDetail = async (condition) => {
    try {
        return await productModels.findOne({ where: condition });
    }
    catch (error) {
        console.log(error);
    }
}

const updateProductCategoryDetail = async (productCategoryDetail) => {
    try {
        return await productModels.update(productCategoryDetail, { where: { id: productCategoryDetail.id } });
    }
    catch (error) {
        console.log(error);
    }
}

const removeProductCategory = async (condition) => {
    try {
        return await productModels.destroy({ where: condition });
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    addProductCategory,
    getAllProductCategory,
    getProductCategoryDetail,
    updateProductCategoryDetail,
    removeProductCategory
}