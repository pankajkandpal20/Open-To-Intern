const internModel = require('../Model/internModel')
const collageModel = require('../Model/collegeModel')
const {isString,isNotEmpty,isWrong,}=require("../validators/validator")

const createIntern = async function(req, res){
try{
    let data = req.body;
    //let collegeName = req.body.collegeName;
    
    if(Object.keys(data).length==0)return res.status(400).send({status: false,message: "Please provide some data."})
    let {name, email, mobile, collegeName} = data;
   
    if(!name)
    return res.status(400).send({status: false,message: "Please provide Intern Name."});
    if(!isString(name))
    return res.status(400).send({status: false,message: "Intern Name must be in string."});
    if(!isNotEmpty(name))
    return res.status(400).send({status: false,message: "Please provide some data in name."});

    if(!mobile)
    return res.status(400).send({status: false, message: "Mobile number is not exist"});
     
    // if((!(/^[0-9]$/).test(mobile)) )
    // return res.status(400).send({status: false, msg: "Please provide correct format like number"});

    if((!(/^[0-9]{10,10}$/).test(mobile)))
    return res.status(400).send({status: false, msg: "Please provide valid number"});

    if (!(/^[a-z0-9_]{3,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/).test(email)) {
        return res.status(400).send({ msg: `Email is invalid`, status: false })}
    
    const EmailAlreadyExist = await internModel.findOne({ email: data.email })

        if (EmailAlreadyExist) {
            return res.status(407).send({ msg: `Email already Exists`, status: false });
    }

    if(!collegeName)
    return res.status(400).send({status: false, msg: "Please provide college name"});
    
    if(!isString(collegeName))
    return res.status(400).send({status: false, msg: "Please Provide collage name in string format"});
    

    if(!isNotEmpty(collegeName))
    return res.status(400).send({status: false, msg: "Collage Name is Empty"});
    
  
    //collageName should be valid(exist in the collection)
    const checkCollageName = await collageModel.findOne({$or : [ {name : collegeName}, { fullName: collegeName}]})
    if(!checkCollageName){
        return res.status(400).send({status: false , msg: "collage does not exist"})
    }
    
    //create Intern Document
    //collageId1 = checkCollageName._id;
    data.collegeId = checkCollageName._id;
    let intern = await internModel.create(data);
    res.status(201).send({status:true, data: intern});

}catch(err){
    res.status(500).send({error: err.message});
}
}

module.exports.createIntern = createIntern