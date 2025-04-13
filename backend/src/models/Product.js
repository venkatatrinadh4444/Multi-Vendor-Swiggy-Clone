const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[String],
        enum:['veg','non-veg']
    },
    bestseller:{
        type:Boolean,
        default:false
    },
    description:{
        type:String
    },
    image:{
        type:String,
        required:true
    },
    firm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Firm"
    }
})

const Product=mongoose.model('Product',productSchema)

module.exports=Product