const collegeModel = require("../Model/collegeModel")
const { isString, isNotEmpty, isWrong, isValidCollege, isValidLink } = require("../validators/validator")
const internModel = require("../Model/internModel")

const createCollege = async function (req, res) {
    try {
        let data = req.body

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please provide some data." })
        let { name, fullName, logoLink } = data




        if (!name) return res.status(400).send({ status: false, message: "Please provide name." })
        if (!isString(name)) return res.status(400).send({ status: false, message: "Name must be in string." })
        if (!isNotEmpty(name)) return res.status(400).send({ status: false, message: "Please provide some data in name." })
        if (!isWrong(name)) return res.status(400).send({ status: false, message: "Name must be in alphabets." })

        const collegeAlreadyExist = await collegeModel.findOne({ name: name })
        if (collegeAlreadyExist) return res.status(407).send({ msg: `college already Exists`, status: false })



        if (!fullName) return res.status(400).send({ status: false, message: "Please provide fullName." })
        if (!isString(fullName)) return res.status(400).send({ status: false, message: "fullName must be in string." })
        if (!isNotEmpty(fullName)) return res.status(400).send({ status: false, message: "Please provide some data in fullName." })
        if (!isValidCollege(fullName)) return res.status(400).send({ status: false, message: "fullName " })

        if (!logoLink) return res.status(400).send({ status: false, message: "Please provide logo link." })
        if (!isString(logoLink)) return res.status(400).send({ status: false, message: "logo link must be in string." })
        if (!isNotEmpty(logoLink)) return res.status(400).send({ status: false, message: "Please provide some data in logo link." })
        if (!isValidLink(logoLink)) return res.status(400).send({ status: false, message: "Please provide a correct link" })




        let createdData = await collegeModel.create(data)
        res.status(201).send({ data: createdData, status: true })
    } catch (err) {
        res.status(500).send({ msg: err.message, status: false })

    }
}

const getCollegeDetails = async function (req, res) {
    try {
        const collegeName = req.query.collegeName
        if (!collegeName) {
            return res.status(400).send({ status: false, msg: "Please Provide College Name" })
        }
        const collegeData = await collegeModel.findOne({ name: collegeName, isDeleted: false }).select({ name: 1, fullName: 1, logoLink: 1 })
        if (!collegeData) {
            return res.status(400).send({ status: false, msg: "College Not Found" })
        }
        const internData = await internModel.find({ collegeId: collegeData._id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1 })
        res.status(200).send({ status: true, data: { name: collegeData.name, fullName: collegeData.fullName, logoLink: collegeData.logoLink, interns: internData } })
    } catch (err) {
        res.status(500).send({ msg: err.message, status: false })
    }
}

module.exports.createCollege = createCollege
module.exports.getCollegeDetails = getCollegeDetails