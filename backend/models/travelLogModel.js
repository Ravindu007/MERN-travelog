const mongoose = require("mongoose")

const Schema = mongoose.Schema

const travelLogSchema = new Schema({
  title:{type:String, require:true},
  place:{type:String, require:true},
  date:{type:String, require:true},
  desc:{type:String, required:true},
  image:{type:String},
  user_id:{type:String, required:true}
},{timestamps:true})

module.exports = mongoose.model('travelLog', travelLogSchema)