import express from "express";

import {
  getUsers,
} from "../controllers/usersController.js";

const router = express.Router();
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import auth from "../helpers/auth.js";
router.get("/", getUsers);

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/signup",
  [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req.body.userName);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
      });
    }

    const { userName, password } = req.body;
    try {
      let user = await User.findOne({
        userName: req.body.userName,
      });
      if (user) {
        return res.status(402).json({
          msg: "User Already Exists" + user,
        });
      }

      user = new User({
        userName: req.body.userName,
        password: req.body.password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post("/login", async (req, res) => {
  const errors = validationResult(req);
  console.log("errors", errors);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      errors: errors.array(),
    });
  }

  const { userName, password } = req.body;
  try {
    if (userName == "" && password == "") {
      return res.status(200).json({
        msg: "Logged in as guest",
        token: "guest",
      });
    }
    let user = await User.findOne({
      userName: userName,
    });
    if (!user)
      return res.status(402).json({
        message: "User Not Exist",
      });

    console.log("user ", user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(403).json({
        message: "Incorrect Password !",
      });

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
        });
      }
    );
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /users/me
 */

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    console.log("user", user);
    res.json(user);
    return user;
  } catch (e) {
    res.send({
      message: "Error in Fetching user",
    });
  }
});

export default router;
