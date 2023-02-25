const mongoose = require("mongoose")

const Schema = mongoose.Schema

const commentSchema = new Schema({
  text: { type: String, require: true },
  by: { type: String, require: true },
  post_id: { type: String, require: true }
},{timestamps:true})

module.exports = mongoose.model('comment', commentSchema)