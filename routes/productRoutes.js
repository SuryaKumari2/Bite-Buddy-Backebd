const express=require('express');
const productController=require('../controllers/productController');
const router=express.Router();

const path = require('path');
const fs = require('fs');

router.post('/add-product/:firmId',productController.addProduct);

router.get('/uploads/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.header('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});
router.get('/:firmId/products',productController.getProductByFirm);
router.delete('/:productId',productController.deleteProduct)
module.exports=router;