const express = require("express")
const multer = require("multer")
const requireAuth = require("../middleware/requireAuth")

const {createTravelLog,getAdminApprovedTravelLogs,getSeachedResults, getAllRealtedTravelLogs, getASingleTravelLog, updateATravelLog, deleteATravelLog,getAllTravelLogs, createApprovedTravelLog, updateApproval, deleteAdminApproved, updateRejection,getAllcomments,createAComment,updateAComment,deleteAComment} = require("../controllers/travelLogControllers")

const router = express.Router()

router.use(requireAuth)

const upload = multer({
  storage: multer.memoryStorage(),
});


//for comments 
const uploadComments = multer()

//admin routes
router.get("/adminAllTravelLogs", getAllTravelLogs)

router.post("/toAdmin", upload.single("image"), createApprovedTravelLog)

router.patch("/adminApproved/:id",upload.single("image"), updateApproval)

router.patch("/adminApproved/rejected/:id",upload.single("image"),  updateRejection)

router.delete("/adminApproved/:id", deleteAdminApproved)



//normal user routes
router.get("/", getAdminApprovedTravelLogs)

//get searched results
router.get("/searched", getSeachedResults)

//get all the workouts related to id
router.get("/related", getAllRealtedTravelLogs)

router.get("/singlePost/:id", getASingleTravelLog)

router.post("/", upload.single("image"), createTravelLog)

router.patch("/:id",upload.single("image"), updateATravelLog)

router.delete("/:id", deleteATravelLog)




//comment routes
router.get("/comments", getAllcomments)

router.post("/comments", uploadComments.none() , createAComment)

router.patch("/comments/:id", updateAComment)

router.delete("/comments/:id", deleteAComment)
module.exports = router