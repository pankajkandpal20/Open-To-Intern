const collegeModel = require("../Model/collegeModel")
const {isString,isNotEmpty,isWrong,isValidCollege,isvalidLink}=require("../validators/validator")

const createCollege = async function (req,res){
    try{
        let data=req.body

        if(Object.keys(data).length==0)return res.status(400).send({status: false,message: "Please provide some data."})
        let {name, fullName, logoLink}=data
        
       


        if(!name)return res.status(400).send({status: false,message: "Please provide name."})
        if(!isString(name))return res.status(400).send({status: false,message: "Name must be in string."})
        if(!isNotEmpty(name))return res.status(400).send({status: false,message: "Please provide some data in name."})
        if(!isWrong(name))return res.status(400).send({status: false,message: "Name must be in alphabets."})

        const collegeAreadyExist = await collegeModel.findOne({ fullname: data.fullName })
        if (collegeAreadyExist) return res.status(407).send({ msg: `college already Exists`, status: false })

        

        if(!fullName)return res.status(400).send({status: false,message: "Please provide fullName."})
        if(!isString(fullName))return res.status(400).send({status: false,message: "fullName must be in string."})
        if(!isNotEmpty(fullName))return res.status(400).send({status: false,message: "Please provide some data in fullName."})
        if(!isValidCollege(fullName))return res.status(400).send({status: false,message: "fullName "})

        if(!logoLink)return res.status(400).send({status: false,message: "Please provide logo link."})
        if(!isString(logoLink))return res.status(400).send({status: false,message: "logo link must be in string."})
        if(!isNotEmpty(logoLink))return res.status(400).send({status: false,message: "Please provide some data in logo link."})
        if(!isvalidLink(logoLink))return res.status(400).send({status: false,message: "Please provide a correct link"})




        let createdData=await collegeModel.create(data)
        res.status(201).send({ data:createdData, status:true })
    }catch(err){
        res.status(500).send({msg:err.message, status:false})

    }
}

module.exports.createCollege=createCollege