const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({

contactId:{
        type: Schema.Types.ObjectId,
        ref: 'userModel',
    },
    phone: {
        type: Number,
        required:true,
    },
    productImage: {
        type: String,
        default:null
    },
    deletedAt: {
        type: Date,
        default:null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
)
module.exports = mongoose.model('Product', productSchema)