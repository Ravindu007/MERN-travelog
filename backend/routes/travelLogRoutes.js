const express = require("express")
const {createTravelLog, getAllTravelLogs,getAllRealtedTravelLogs, getASingleTravelLog, updateATravelLog, deleteATravelLog} = require("../controllers/travelLogControllers")

const router = express.Router()

//routes
router.get("/", getAllTravelLogs)

//get all the workouts related to id
router.get("/related", getAllRealtedTravelLogs)

router.get("/:id", getASingleTravelLog)

router.post("/", createTravelLog)

router.patch("/:id", updateATravelLog)

router.delete("/:id", deleteATravelLog)


module.exports = router