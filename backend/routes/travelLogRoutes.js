const express = require("express")
const multer = require("multer")
const requireAuth = require("../middleware/requireAuth")

const {createTravelLog,getAdminApprovedTravelLogs, getAllRealtedTravelLogs, getASingleTravelLog, updateATravelLog, deleteATravelLog,getAllTravelLogs, createApprovedTravelLog, updateApproval, deleteAdminApproved, updateRejection} = require("../controllers/travelLogControllers")

const router = express.Router()

router.use(requireAuth)

const upload = multer({
  storage: multer.memoryStorage(),
});


//admin routes
router.get("/adminAllTravelLogs", getAllTravelLogs)

router.post("/toAdmin", upload.single("image"), createApprovedTravelLog)

router.patch("/adminApproved/:id",upload.single("image"), updateApproval)

router.patch("/adminApproved/rejected/:id",upload.single("image"),  updateRejection)

router.delete("/adminApproved/:id", deleteAdminApproved)



//normal user routes
router.get("/", getAdminApprovedTravelLogs)

//get all the workouts related to id
router.get("/related", getAllRealtedTravelLogs)

router.get("/:id", getASingleTravelLog)

router.post("/", upload.single("image"), createTravelLog)

router.patch("/:id",upload.single("image"), updateATravelLog)

router.delete("/:id", deleteATravelLog)


module.exports = router