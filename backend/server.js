require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")


const App = express()

//midlleware
App.use(express.json())


//establishing router
const travelLogRoutes = require("./routes/travelLogRoutes")

//establish routes
App.use("/api/travelLogs",travelLogRoutes)

mongoose.set('strictQuery', false)

//establish connection to the database
mongoose.connect(process.env.MONGO_URI)
  .then(()=>{
    App.listen(process.env.PORT, ()=>{
      console.log("Listening to port:", process.env.PORT," and connected to DB");
    })
  })
  .catch((error)=>{
    console.log(error);
  })