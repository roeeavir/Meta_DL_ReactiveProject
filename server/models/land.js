const mongoose = require('mongoose')

const landSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true

    },
    owner: {
        type: String,
        required: false,
        default: 'none'
    },
    price: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Land', landSchema)