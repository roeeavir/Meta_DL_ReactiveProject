import LandModel from "../models/land.js"

export const getLands = async (req, res) => {
    try {
        const lands = await LandModel.find({})

        console.log(lands)

        return res.status(200).json(lands)
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: "Error getting lands"
        })
    }
}

export const postLand = (req, res) => {
    const post = req.body

    const newLand = new LandModel(post)

    try {
        newLand.save()

        res.status(201).json(newLand)
    } catch (error) {
        res.status(409).json({
            message: "Error creating land"
        })
    }
}