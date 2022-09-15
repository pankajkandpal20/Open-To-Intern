const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        
    },
    email: {
        type: String,
        require: true,
        unique: true,
        
    },
    mobile: {
        type: String,
        unique: true,
        require: true,
        
    },
    collegeId: {
        type: objectId,
        ref: "College",
        
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Interns', internSchema)  