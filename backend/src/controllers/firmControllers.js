
const Firm=require('../models/Firm')
const Vendor=require('../models/Vendor')
const cloudinary=require('../middlewares/cloudinary')
const fs=require('fs')
const Product=require('../models/Product')

const addFirm=async(req,res)=> {
    try {
        const {firmName,area,category,region,offer}=req.body;
        const imagePath=req.file?.path
        const {id}=req
        let image;
        const existFirm=await Firm.findOne({firmName})
        if(existFirm)
            return res.status(409).json({msg:"Firm exist with same name"})
        const vendor=await Vendor.findById(id)
        if(!vendor) 
            return res.status(400).json({msg:'vendor not found!'})
        if(vendor.firm)
            return res.status(400).json({msg:'Vendor is already registered with a firm'})

        if(!firmName || !area || !category || !region) 
            return res.status(400).json({msg:'All fields are required!'})

        if(imagePath) {
            const responseUrl=await cloudinary.uploader.upload(imagePath)
            image=responseUrl.secure_url;
        }

        const newFirm=new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor:id
        })

        const savedResponse=await newFirm.save()

        vendor.firm=savedResponse
        await vendor.save()

        fs.unlinkSync(imagePath)

        return res.status(201).json({msg:'New firm added successfully!',vendor})

    } catch (err) {
        console.log('Error occured at adding firm',err)
        return res.status(500).json({msg:"Server error"})
    }
}

const getAllFirms=async(req,res)=> {
    try {
        const region=req.params.region||""
        const firms=await Firm.find({})
        if(region==="all") 
            return res.status(200).json({filteredFirms:firms,msg:"Showing all restaurents"})
        else {
            const filteredFirms=firms.filter(eachFirm=>eachFirm.region.includes(region))
            return res.status(200).json({msg:`Showing ${region} restaurents`,filteredFirms})
        }

    } catch (err) {
        console.log('Error occured at getting all firms',err)
        return res.status(500).json({msg:"Server error"})
    }
}

const deleteFirm=async(req,res)=> {
    try {
        const firmId=req.params.firmId

        const firm=await Firm.findById(firmId)
        if(firm.products.length>0) 
            return res.status(400).json({msg:'Before deleting the firm.You must delete all products associated with it.'})

        await Firm.findByIdAndDelete(firmId)
        await Vendor.updateOne({firm:firmId},{$unset:{firm:1}})

        if(!firm)
            return res.status(404).json({msg:'firm not found!'})
        return res.status(200).json({msg:'firm deleted successfully!'})
    } catch (err) {
        console.log('Error occured at deleting firm',err)
        return res.status(500).json({msg:'Server error'})
    }
}


module.exports={addFirm,getAllFirms,deleteFirm}