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
    const image = req.file ? `/uploads/${req.file.filename}` : null // get the uploaded image path or set to null if not provided
    const travelLog = await travelLogModel.create({ title, place, date, desc, image })
    res.status(200).json(travelLog)
  } catch (error) {
    res.status(400).json({ error: error.message })
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


      const travelLog = await travelLogModel.findById(id);

      // ensure the travel log exists
      if (!travelLog) {
        return res.status(404).json({ error: "Travel log not found" });
      }

      // update travel log properties
      travelLog.title = req.body.title || travelLog.title;
      travelLog.place = req.body.place || travelLog.place;
      travelLog.date = req.body.date || travelLog.date;
      travelLog.desc = req.body.desc || travelLog.desc;

      // handle image upload
      if (req.file) {
        travelLog.image = `/uploads/${req.file.filename}`;
      }

      const updatedTravelLog = await travelLog.save();

      res.status(200).json(updatedTravelLog);
    } catch (error) {
      res.status(400).json({ error: error.message });
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