const internModel = require('../Model/internModel')
const collageModel = require('../Model/collegeModel')

const createIntern = async function(req, res){
try{
    let data = req.body;
    let collegeName = req.body.collegeName;
    
    
    //collageName should be valid(exist in the collection)
    const checkCollageName = await collageModel.findOne({name: collegeName})
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