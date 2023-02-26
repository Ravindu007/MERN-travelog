const mongoose = require("mongoose");
const adminApprovedTravellogModel = require("../models/adminApprovedTravellogModel");
const travelLogModel = require("../models/travelLogModel")
const commentModel = require("../models/commentModel")

const {admin} = require("../server")
const bucket = admin.storage().bucket(process.env.STORAGE_BUCKET);

//Admin controllers

//create admin approved posts
const createApprovedTravelLog = async(req,res) => {
  const {title, place, date, desc, image, userEmail, user_id, approved, related_id} = req.body
  
  try{
    const travelLog = await adminApprovedTravellogModel.create({
      title,
      place,
      date,
      desc,
      image,
      userEmail,
      user_id,
      approved,
      related_id
    });
    res.status(200).json(travelLog);
  }catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//get all docs 
const getAllTravelLogs = async(req,res) => {
  try {
    const allTravelLogs = await travelLogModel.find({}).sort({createdAt:-1})
    res.status(200).json(allTravelLogs)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}


//update only approval
const updateApproval = async(req,res) => {
  const {approval, related_id} = req.body

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
      travelLog.approval = approval
      travelLog.related_id = related_id
      
      const updatedTravelLog = await travelLog.save();
      res.status(200).json(updatedTravelLog);
        

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}


const updateRejection =  async(req,res) => {
  const {approval, related_id} = req.body

  try{
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
       travelLog.approval = approval
       travelLog.related_id = related_id
      
      const updatedTravelLog = await travelLog.save();
      res.status(200).json(updatedTravelLog);

  }catch (error) {
    res.status(400).json({ error: error.message });
  }

}


const deleteAdminApproved = async(req, res) => {
  try {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
      res.status(400).json({error:"No such document 123"})
    }

    const deletedTravelLog = await adminApprovedTravellogModel.findByIdAndDelete({_id:id})

    if(!deletedTravelLog){
      res.status(400).json({error:"No such document"})
    }

    res.status(200).json(deletedTravelLog)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}





//all user controllers
//get AdminApprovedTravelLogs
const getAdminApprovedTravelLogs = async(req,res) =>{
  try {
    const allAdminApprovedTravelLogs = await adminApprovedTravellogModel.find({}).sort({createdAt:-1})
    res.status(200).json(allAdminApprovedTravelLogs)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

//getSearched Results
const getSeachedResults = async(req, res) => {
  const {searchTerm} = req.query;

  try{
    const searchRegex = new RegExp(searchTerm, 'i');

    const searchedTravelLogs = await adminApprovedTravellogModel.find({
      $or: [
        { title: { $regex: searchRegex } },
        { place: { $regex: searchRegex } },
        { desc: { $regex: searchRegex } },
        { userEmail: { $regex: searchRegex } },
        // add more fields to search here if needed
      ]
    });
    res.status(200).json(searchedTravelLogs)
  }catch(error){
    res.status(400).json({error:error})
  }
}


//get all related travelLogs (filter by id => for profile)
const getAllRealtedTravelLogs = async(req,res) => {
  try {
    const user_id = req.user._id
    const allRelatedTravelLogs = await travelLogModel.find({user_id}).sort({createdAt:-1})
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

    const singleTravelLog = await adminApprovedTravellogModel.findById(id)

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
  const {title, place, date, desc, approval, related_id} = req.body
  const user_id = req.user._id
  const userEmail = req.userEmail

  try {
    let imageURL = null;

    if(req.file){
      const filename = req.file.originalname;
      const file = bucket.file(filename);

      const stream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      stream.on("error", (err) => {
        console.error(err);
      });

      stream.on("finish", async () => {
        imageURL = `https://storage.googleapis.com/${bucket.name}/${filename}`;
        const travelLog = await travelLogModel.create({
          title,
          place,
          date,
          desc,
          image: imageURL,
          user_id,
          userEmail,
          approval,
          related_id
        });
        res.status(200).json(travelLog);
      });

      stream.end(req.file.buffer);
    }else {
      const travelLog = await travelLogModel.create({title,place,date,desc,image: null,user_id, userEmail, approval,related_id});
      res.status(200).json(travelLog);
    }
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

      const userId = req.user._id; // Get the user ID from the request object


      const travelLog = await travelLogModel.findById(id);

      // ensure the travel log exists
      if (!travelLog) {
        return res.status(404).json({ error: "Travel log not found" });
      }

      // Check if the user ID matches the user ID of the travel log
      if (travelLog.user_id.toString() !== userId.toString()) {
        return res.status(401).json({ error: "Unauthorized access" });
      }

      // update travel log properties
      travelLog.title = req.body.title || travelLog.title;
      travelLog.place = req.body.place || travelLog.place;
      travelLog.date = req.body.date || travelLog.date;
      travelLog.desc = req.body.desc || travelLog.desc;
      travelLog.user_id = userId; // Update the user ID

      let imageURL = null;

      // handle image upload
      if (req.file) {
        const filename = req.file.originalname;
        const file = bucket.file(filename);
  
        const stream = file.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
          },
        });
  
        stream.on("error", (err) => {
          console.error(err);
        });
        
        stream.on("finish", async () => {
          imageURL = `https://storage.googleapis.com/${bucket.name}/${filename}`;
          travelLog.image = imageURL

          const updatedTravelLog = await travelLog.save();
          res.status(200).json(updatedTravelLog);
        });

        stream.end(req.file.buffer);
      }else {
        const updatedTravelLog = await travelLog.save();
        res.status(200).json(updatedTravelLog);
      }
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




//comments
//comments controllers 
const getAllcomments = async(req,res) =>{
  try{
    const allComments = await commentModel.find({}).sort({createdAt:1})
    res.status(200).json(allComments)
  }catch(error){
    res.status(400).json(error)
  }
}

const createAComment = async(req,res) => {
  const { text, by, post_id } = req.body;


  try {
    const comment = await commentModel.create({text,by,post_id})
    res.status(200).json(comment)
  } catch (error) {
    res.status(400).json(error)
  }
}

const updateAComment = async(req,res) => {
  const {id} = req.params

  try {
    const updateComment = await commentModel.findByIdAndUpdate({_id:id},{...req.body},{new:true})

    res.status(200).json(updateComment)
  } catch (error) {
    res.status(400).json(error)
  }
}

//delete a comment
const deleteAComment = async(req,res) => {
  try{
    const {id} = req.params

    const deleteComment= await commentModel.findByIdAndDelete({_id:id})

    res.status(200).json(deleteComment)
  }catch (error) {
    res.status(400).json(error)
  }
}


module.exports = {createTravelLog, getAdminApprovedTravelLogs,getSeachedResults, getAllRealtedTravelLogs,getASingleTravelLog, updateATravelLog, deleteATravelLog, createApprovedTravelLog, getAllTravelLogs, updateApproval, deleteAdminApproved, updateRejection, getAllcomments, createAComment, updateAComment, deleteAComment}