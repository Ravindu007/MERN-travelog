const mongoose = require("mongoose")
const travelLogModel = require("../models/travelLogModel")


//get all docs 
const getAllTravelLogs = async(req,res) => {
  try {
    const allTravelLogs = await travelLogModel.find({}).sort({createdAt:-1})
    res.status(200).json(allTravelLogs)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

//get all related travelLogs (filter by id => for profile)
const getAllRealtedTravelLogs = async(req,res) => {
  try {
    const allRelatedTravelLogs = await travelLogModel.find({}).sort({createdAt:-1})
    res.status(200).json(allRelatedTravelLogs)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

//get single doc
const getASingleTravelLog = async(req,res) => {
  try {
    const {id} = req.params

    //ensure id is valid 
    if(!mongoose.Types.ObjectId.isValid(id)){
      res.status(400).json({error:"No such document"})
    }

    const singleTravelLog = await travelLogModel.findById(id)

    if(!singleTravelLog){
      res.status(400).json({error: "No such document"})
    }

    res.status(200).json(singleTravelLog)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

// create doc
const createTravelLog = async(req,res) => {
  const {title, place, date, desc} = req.body

  try {
    const travelLog = await travelLogModel.create({title, place, date, desc})
    res.status(200).json(travelLog)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

//update doc
const updateATravelLog = async(req,res) => {
  try {
    const {id} = req.params

    //enusre id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
      res.status(400).json({error:"No such document"})
    }

    const updatedTravelLog = await travelLogModel.findByIdAndUpdate({_id:id},{...req.body},{new:true})

    if(!updatedTravelLog){
      res.status(400).json({error:"No such document"})
    }

    res.status(200).json(updatedTravelLog)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}


//delete doc
const deleteATravelLog = async(req, res) => {
  try {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
      res.status(400).json({error:"No such document"})
    }

    const deletedTravelLog = await travelLogModel.findByIdAndDelete({_id:id})

    if(!deletedTravelLog){
      res.status(400).json({error:"No such document"})
    }

    res.status(200).json(deletedTravelLog)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

module.exports = {createTravelLog, getAllTravelLogs, getAllRealtedTravelLogs,getASingleTravelLog, updateATravelLog, deleteATravelLog}