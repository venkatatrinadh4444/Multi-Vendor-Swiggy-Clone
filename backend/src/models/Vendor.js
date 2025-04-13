const mongoose=require('mongoose')

const vendorSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    firm:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Firm"
    },
    cart:[
        {
            item:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ]
},{timestamps:true})

module.exports=mongoose.model('Vendor',vendorSchema)

