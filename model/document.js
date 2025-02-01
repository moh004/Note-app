const mongoose = require("mongoose")

const document_schceme = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
})
module.exports = mongoose.model("doc" , document_schceme)