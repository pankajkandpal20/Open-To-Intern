const express = require("express")
const router = express.Router()
const { createCollege, getCollegeDetails } = require("../Controller/collegeController")
const {createIntern} = require("../Controller/internController")


router.post('/functionup/colleges',createCollege)

router.post('/functionup/interns', createIntern);

router.get("/functionup/collegeDetails", getCollegeDetails)


module.exports=router; 