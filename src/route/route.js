const express = require("express")
const router = express.Router()
const collegeController = require("../Controller/collegeController")
const internController = require("../Controller/internController")


router.post('/functionup/colleges',collegeController.createCollege)

<<<<<<< HEAD
router.post('/functionup/interns', internController.createIntern);
=======
router.get("/functionup/collegeDetails", collegeController.getCollegeDetails)


>>>>>>> eb0ea170a2d8661d13e7ac1b1088e425f0a27a58



module.exports=router; 