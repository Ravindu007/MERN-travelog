const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")


//create a token for used in signup/ login
const createToken = (_id) => {
  return jwt.sign({_id:_id}, process.env.SECRET, {expiresIn:'1d'})
}

//sign up controller 
const signupUser = async(req,res) => {
  const {email, password} = req.body

  try{
    const user = await userModel.signup(email, password)

    //create token 
    const token = createToken(user._id)

    res.status(200).json({email, token})
  }catch(error){
    res.status(400).json({error:error.message})
  }
}


//login controller
const loginUser = async(req,res) => {
  const {email, password} = req.body

  try {
    const user = await userModel.login(email,password)

    //create a token for that user
    const token = createToken(user._id)
    //send token + email as response
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}


module.exports = {loginUser, signupUser}