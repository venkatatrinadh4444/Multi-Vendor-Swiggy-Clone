const express=require('express')
const {registerVendor,loginVendor, logoutVendor, vendorDetails,showCartProducts}=require('../controllers/vendorControllers')
const verifyVendor=require('../middlewares/verifyVendor')

const routes=express.Router()

routes.post('/register-vendor',registerVendor)
routes.post('/login-vendor',loginVendor)
routes.delete('/logout-vendor',logoutVendor)
routes.get('/vendor-details',verifyVendor,vendorDetails)
routes.get('/show-cart-products',verifyVendor,showCartProducts)

module.exports=routes