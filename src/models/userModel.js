const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    
  name: { type: String,required:true , trim:true}, 
  deletedAt: {
    type: Schema.Types.Date,
    default: null,
  }
},{timestamps:true})

module.exports = mongoose.model("User",userSchema)