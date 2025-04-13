const Vendor=require('../models/Vendor')

const gettingFirmId=async(req,res,next)=> {
    try {
        const {id}=req
        const vendor=await Vendor.findById(id)
        const firmId=vendor.firm
        req.firmId=firmId
        next()
    }
    catch(err) {
        console.log('Error occured at getting firm id',err)
        return res.status(500).json({msg:'Server error'})
    }
}

module.exports=gettingFirmId