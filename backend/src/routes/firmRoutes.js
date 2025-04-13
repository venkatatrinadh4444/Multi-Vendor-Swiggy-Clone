const express=require('express')
const {addFirm,getAllFirms, deleteFirm}=require('../controllers/firmControllers')
const upload=require('../middlewares/multer')
const verifyVendor=require('../middlewares/verifyVendor')

const routes=express.Router()

routes.post('/add-firm',upload.single('image'),verifyVendor,addFirm)
routes.get('/get-firms/:region',getAllFirms)
routes.delete('/delete-firm/:firmId',deleteFirm)
module.exports=routes