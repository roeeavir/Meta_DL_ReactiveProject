import UserModel from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});

    console.log(users);

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error getting users",
    });
  }
};

export const registerUser = (req, res) => {
  UserModel.findOne({ userName: req.body.userName }).then((user) => {
    if (user) {
      return res.status(400).json({ userName: "User already exists" });
    } else {
      const newUser = new UserModel({
        userName: req.body.userName,
        password: req.body.password,
      });
      newUser.save();
      return res.status(200).json({ msg: newUser });
    }
  });
};

export const login = (req, res) => {
  try {
    const password = req.query["password"];
    UserModel.findOne({
      userName: req.params.userName,
    }).then((user) => {
      if (user == null) {
        return res.status(404).json({
          userName: "User or Password are incorrect1",
        });
      } else {
        console.log("new sevel2 " + password);
        if (user.password != password) {
          return res.status(400).json({
            password: "User or Password are incorrect2",
          });
        } else {
          return res.status(200).json({
            msg: user,
          });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};
