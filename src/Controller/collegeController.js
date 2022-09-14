const collegeModel = require("../Model/collegeModel")
const {isString,isWrong}=require("../validators/validator")

const createCollege = async function (req,res){
    try{
        let data=req.body

        if(Object.keys(data).length==0)return res.status(400).send({status: false,message: "Please provide some data."})
        let {name, fullName, logoLink}=data
        

        if(!name)return res.status(400).send({status: false,message: "Please provide name."})
        if(!isString(name))return res.status(400).send({status: false,message: "Name must be in string."})
        if(!isWrong(name))return res.status(400).send({status: false,message: "Please provide name "})

        let createdData=await collegeModel.create(data)
        res.staus(201).send({ data:createdData, status:true })
    }catch(err){
        res.status(500).send({msg:err.message, status:false})

    }
}

module.exports.createCollege=createCollege