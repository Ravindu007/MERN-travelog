const express = require("express")
const multer = require("multer")

const {createTravelLog, getAllTravelLogs,getAllRealtedTravelLogs, getASingleTravelLog, updateATravelLog, deleteATravelLog} = require("../controllers/travelLogControllers")

const router = express.Router()

const upload = multer({
  storage: multer.memoryStorage(),
});


//routes
router.get("/", getAllTravelLogs)

//get all the workouts related to id
router.get("/related", getAllRealtedTravelLogs)

router.get("/:id", getASingleTravelLog)

router.post("/", upload.single("image"), createTravelLog)

router.patch("/:id",upload.single("image"), updateATravelLog)

router.delete("/:id", deleteATravelLog)


module.exports = router