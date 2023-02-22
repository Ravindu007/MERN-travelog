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

//static method for login 
userSchema.statics.login = async function(email, password){
  //check wether both email and password has given
  if(!email || !password){
    throw Error("Both email and password should be provided")
  }

  //check whether a user is exists
  const user = await this.findOne({email})

  //if a user not exists
  if(!user){
    throw Error("Incorrect email")
  }

  //if a user exists match the password
  const match = await bcrypt.compare(password, user.password)

  //if pasword mismatch
  if(!match){
    throw Error("Incorrect Password")
  }

  //if password matches returns the fetched user
  return user
}

module.exports = mongoose.model('user', userSchema)