import mongoose from 'mongoose'

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
        default: 'L&R.Ltd'
    },
    price: {
        type: String,
        required: true,
    }
})

const LandModel  = mongoose.model('Land', landSchema)

export default LandModel