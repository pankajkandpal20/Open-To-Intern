const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    mobile: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    collegeId: {
        type: objectId,
        ref: "College",
        trim: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Interns', internSchema)