
//---------------------Improting Models and validators-------------------------------------------------------

const internModel = require('../Model/internModel')
const collageModel = require('../Model/collegeModel')
const { isString, isNotEmpty, isValidName } = require("../validators/validator")

//-----------------------------------------------------------------------------------------------------------

//--------------------- Creating Controller for Intern dataBase POST API /functionup/interns -----------------------------------------------

const createIntern = async function (req, res) {
    try {
        let data = req.body;

        //Checking the data in req body is present or not
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please provide some data." })

        let { name, email, mobile, collegeName } = data;


        //Validating intern name
        if (!name)
            return res.status(400).send({ status: false, message: "Please provide Intern Name." });

        if (!isString(name))
            return res.status(400).send({ status: false, message: "Intern Name must be in string." });

        if (!isNotEmpty(name))
            return res.status(400).send({ status: false, message: "Please provide some data in name." });

        if (!isValidName(name))
            return res.status(400).send({ status: false, message: "Please provide a valid name" });
        data.name = name.toLowerCase().trim()


        //Getting the old data form the intern dataBase
        let internsData = await internModel.find()

        //Validating intern email
        if (!email)
            return res.status(400).send({ status: false, message: "Please provide email" });

        data.email = email.trim()

        if (!(/^[A-Za-z0-9_]{3,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/).test(data.email)) {
            return res.status(400).send({ status: false, msg: "Email is invalid" })
        }

        //Checking the email is already registered or not
        for (let i = 0; i < internsData.length; i++) {
            if (internsData[i].email == data.email) {
                return res.status(409).send({ status: false, msg: "email is alredy registered " });
            }
        }


        //Validating intern mobile
        if (!mobile)
            return res.status(400).send({ status: false, message: "Please provide mobile" });

         data.mobile = mobile.toString().trim() 
        if ((!(/^[ 0-9 ]{10,10}$/).test(data.mobile)))
            return res.status(400).send({ status: false, msg: "Please provide valid number" });
            

        //Checking the number is already registered or not
        for (let i = 0; i < internsData.length; i++) {
            if (internsData[i].mobile == data.mobile) {
                return res.status(409).send({ status: false, msg: "number is already registered" });
            }
        }


        //Validating collegeName
        if (!collegeName)
            return res.status(400).send({ status: false, msg: "Please provide college name" });

        if (!isString(collegeName))
            return res.status(400).send({ status: false, msg: "Please Provide collage name in string format" });

        if (!isNotEmpty(collegeName))
            return res.status(400).send({ status: false, msg: "Collage Name is Empty" });

        data.collegeName = collegeName.toLowerCase().trim()


        //Finding the college 
        const checkCollageName = await collageModel.findOne({ $or: [{ name: data.collegeName }, { fullName: data.collegeName }] })

        if (!checkCollageName)
            return res.status(404).send({ status: false, msg: "collage does not exist" })



        data.collegeId = checkCollageName._id;

        //Creating the intern data
        let intern = await internModel.create(data);

        res.status(201).send({ status: true, data: intern });

    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
}

module.exports= {createIntern}