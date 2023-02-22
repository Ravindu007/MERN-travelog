const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")


//create a token for used in signup/ login
const createToken = (_id) => {
  //pass
}

//sign up controller 
const signupUser = async(req,res) => {
  const {email, password} = req.body

  try{
    const user = await userModel.signup(email, password)
    res.status(200).json({email, user})
  }catch(error){
    res.status(400).json({error:error.message})
  }
}


//login controller
const loginUser = async(req,res) => {
  res.json({msg:"User logged in"})
}


module.exports = {loginUser, signupUser}