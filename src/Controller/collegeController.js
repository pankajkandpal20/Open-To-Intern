const collegeModel = require("../Model/collegeModel")

const createCollege = async function (req,res){
    try{
        let data=req.body
        let createdData=await collegeModel.create(data)
        res.staus(201).send({ data:createdData, status:true })


    }catch(err){
        res.status(500).send({msg:err.message, status:false})

    }
}

module.exports.createCollege=createCollege