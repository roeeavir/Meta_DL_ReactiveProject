import UserModel from "../models/user.js"

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find({})

        console.log(users)

        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message: "Error getting users"
        })
    }
}

export const postUser = (req, res) => {
    const post = req.body

    const newUser = new UserModel(post)

    try {
        newUser.save()

        res.status(201).json(newUser)
    } catch (error) {
        res.status(409).json({
            message: "Error creating user"
        })
    }
}