const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
  email:{type:String, required:true, unique:true},
  password:{type:String, required:true}
})


//static method for signup
userSchema.statics.signup = async function(email, password){

  //check whether the email is already exists
  const exists = await this.findOne({email})

  if(exists){
    throw Error("This email already exists")
  }

  //validation
  //check whether all the input fields are filled
  if(!email || !password){
    throw Error("Both email and password should be provided")
  }
  
  //email validation
  if(!validator.isEmail(email)){
    throw Error("Email is not valid")
  }

  //check whether the password is strong enough 
  if(!validator.isStrongPassword(password)){
    throw Error("Password is not Strong enough")
  }

  
  //hashing password 
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  
  //saving user in database
  const user = await this.create({email, password:hashPassword})
  return user
}

module.exports = mongoose.model('user', userSchema)