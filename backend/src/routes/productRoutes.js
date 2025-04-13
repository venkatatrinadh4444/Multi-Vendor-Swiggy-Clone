const express=require('express')
const {addProduct, getProductsByFirmId, deleteProduct, getProductsForEachFirmId, searchedProducts, addToCart, deleteCartProduct}=require('../controllers/productControllers')
const upload=require('../middlewares/multer')
const verifyVendor=require('../middlewares/verifyVendor')
const gettingFirmId=require('../middlewares/gettingFirmId')


const routes=express.Router()


routes.post('/add-product',upload.single('image'),verifyVendor,gettingFirmId,addProduct)
routes.get('/get-products',verifyVendor,gettingFirmId,getProductsByFirmId)
routes.get('/:firmId/get-products',getProductsForEachFirmId)
routes.delete('/delete-product/:productId',deleteProduct)
routes.get('/search-products',searchedProducts)
routes.post('/:productId/add-to-cart',verifyVendor,addToCart)
routes.delete('/:productId/delete-cart-item',verifyVendor,deleteCartProduct)


module.exports=routes