const express = require("express")
const {createTravelLog, getAllTravelLogs, getASingleTravelLog, updateATravelLog, deleteATravelLog} = require("../controllers/travelLogControllers")


//for image upload
const multer = require("multer")
const path = require("path")

const router = express.Router()


//setup storage engine
const storage = multer.diskStorage({
  destination:'../frontend/public/uploaded-photos',
  filename: function(req,file,cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage:storage
})


//routes
router.get("/", getAllTravelLogs)

router.get("/:id", getASingleTravelLog)

router.post("/", upload.single('image') , createTravelLog)

router.patch("/:id", updateATravelLog)

router.delete("/:id", deleteATravelLog)


module.exports = router