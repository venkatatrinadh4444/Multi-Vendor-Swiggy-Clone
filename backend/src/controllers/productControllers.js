

const Product=require('../models/Product')
const cloudinary=require('cloudinary')
const Firm=require('../models/Firm')
const fs=require('fs')
const Vendor=require('../models/Vendor')

const addProduct=async(req,res)=> {
    try {
        const {firmId}=req;
        const {name,price,category,bestseller,description}=req.body;
        const imagePath=req.file?.path
        let image;
        const firm=await Firm.findById(firmId)
        if(!firm)
            return res.status(404).json({msg:'firm not found'})
        if(!name || !price || !category || !imagePath)
            return res.status(400).json({msg:"All fields are required!"})
        if(imagePath) {
            const responseUrl=await cloudinary.uploader.upload(imagePath)
            image=responseUrl.secure_url
        }
        const newProduct=new Product({
            name,
            price,
            category,
            bestseller,
            description,
            image,
            firm:firmId
        })
        const savedResponse=await newProduct.save()

        firm.products.push(savedResponse)
        await firm.save()

        fs.unlinkSync(imagePath)

        return res.status(201).json({msg:'New product added successfully!'})

    } catch (err) {
        console.log('Error occured at adding firm',err)
        return res.status(500).json({msg:"Server error"})
    }
}

const getProductsForEachFirmId=async(req,res)=>{
    try {
        const {firmId}=req.params
        const firm=await Firm.findById(firmId)
        if(!firm)
            return res.status(404).json({msg:'Firm not found'})
        const products=await Product.find({firm})
        return res.status(200).json({products,firmName:firm.firmName})
    } catch (err) {
        console.log('Error occured at getting products',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const getProductsByFirmId=async(req,res)=> {
    try {
        const {firmId}=req;
        const firm=await Firm.findById(firmId)
        const firmName=firm.firmName;
        if(!firm)
            return res.status(404).json({msg:'firm not found!'})
        const products=await Product.find({firm:firmId})
        return res.status(200).json({firmName,products})
    } catch (err) {
        console.log('Error occured at getting products',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const deleteProduct=async(req,res)=> {
    try {
        const productId=req.params.productId
        const product=await Product.findByIdAndDelete(productId)
        if(!product)
            return res.status(404).json({msg:"Product not found"})
        await Vendor.deleteOne({'cart.item':productId})
        return res.status(200).json({msg:'Product deleted successfully!'})
    } catch (err) {
        console.log('Error occured at deleting product',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const searchedProducts=async(req,res)=> {
    try {
        const itemName=req.query.itemName;
        if(!itemName)
            return res.status(404).json({msg:'Please enter the item name to search'})
        const products=await Product.find({})
        const filterdProducts=products.filter(eachItem=>eachItem.name.toLocaleLowerCase().includes(itemName.toLocaleLowerCase()))

        if(!filterdProducts)
            return res.status(404).json({msg:'No results found!'})
        return res.status(200).json({filterdProducts})
    }
    catch(err) {
        console.log('Error occured at deleting product',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const addToCart=async(req,res)=> {
    try {
        const {id}=req
        const productId=req.params.productId;
        const product=await Product.findById(productId)
        if(!product)
            return res.status(404).json({msg:'Product not found!'})
        const vendor=await Vendor.findById(id)
        if(!vendor)
            return res.status(404).json({msg:"Vendor not found!"})


        const vendorCartItem=vendor.cart.find(eachItem=>eachItem.item.toString()===product._id.toString())
        if(vendorCartItem) {
            vendorCartItem.quantity=vendorCartItem.quantity+1;
            await vendor.save()
            return res.status(201).json({msg:'Item added to cart!'})
        }
        else {
            const updateCart=await Vendor.findByIdAndUpdate(id,{
                $push:{
                    cart:{
                        item:product._id
                    }
                }
            },{new:true})
            return res.status(201).json({msg:'Item added to cart!',updateCart})
        }
       
    } catch (err) {
        console.log('Error occured at adding product to cart',err)
        return res.status(500).json({msg:'Server error'})
    }
}

const deleteCartProduct=async(req,res)=> {
    try {
        const {id}=req
        const productId=req.params.productId
        const updatedProducts=await Vendor.findByIdAndUpdate(id,{$pull:{cart:{_id:productId}}},{new:true}).populate('cart.item')
        return res.status(200).json({msg:'Item removed from cart!',updatedProducts})
    } catch (err) {
        console.log('Error occured at deleting product from cart',err)
        return res.status(500).json({msg:'Server error'})
    }
}

module.exports={addProduct,getProductsByFirmId,deleteProduct,getProductsForEachFirmId,searchedProducts,addToCart,deleteCartProduct}