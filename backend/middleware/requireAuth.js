const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")

const requireAuth = async(req,res,next) => {
  //jwt comes with this header
  const {authorization} = req.headers

  if(!authorization){
    res.status(400).json({error:"Authorization token requires"})
  }

  const token = authorization.split(" ")[1]

  try {
    const {_id} = jwt.verify(token, process.env.SECRET)
    
    req.user = await userModel.findOne({_id}).select('_id') //req.user == req.id
    next()
  } catch (error) {
    res.status(400).json({error:"Request not authorized"})
  }

}

module.exports = requireAuth