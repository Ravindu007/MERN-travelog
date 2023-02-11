const express = require("express")
const {createTravelLog, getAllTravelLogs, getASingleTravelLog, updateATravelLog, deleteATravelLog} = require("../controllers/travelLogControllers")


const router = express.Router()

router.get("/", getAllTravelLogs)

router.get("/:id", getASingleTravelLog)

router.post("/", createTravelLog)

router.patch("/:id", updateATravelLog)

router.delete("/:id", deleteATravelLog)


module.exports = router