import express from "express";
import LandModel from "../models/landModel.js"
import UserModel from "../models/userModel.js"
import {
  getLands,
  postLand,
  updateLand,
} from "../controllers/landsController.js";

const router = express.Router();
// const Land = require('../models/site');

router.get("/", getLands);
router.post("/", postLand);
//router.patch("/", updateLand);

router.patch("/price", getLandFromDataBase, async (req, res) => {
    try {
        if (req.body.price == null || req.body.price == undefined || req.body.price == "" || req.body.price < 0 || parseInt(req.body.price) != req.body.price) {
          return res.status(400).json({
            message: "Price is not valid"
          });
        }
        res.land.price = req.body.price;
        const updatedLand = await res.land.save();
        res.json(updatedLand);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

router.patch("/forSale", getLandFromDataBase, async (req, res) => {
    res.land.isForSale = req.body.isForSale;
  try {
    const updatedLand = await res.land.save();
    res.json(updatedLand);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

router.patch("/game", getLandFromDataBase, async (req, res) => {
  res.land.game = req.body.game;
  try {
    const updatedLand = await res.land.save();
    res.json(updatedLand);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

router.patch("/purchase", getLandFromDataBase, getBuyerFromDataBaseByUserName, getSellerFromDataBaseByUserName, async (req, res) => {


  res.land.owner = res.buyer.userName;
  res.land.price = "N/A";
  res.land.isForSale = false;
  res.land.game = "N/A";
  res.seller.cash = res.seller.cash + res.land.price;
  res.buyer.cash = res.buyer.cash - res.land.price;
  try {
    const updatedLand = await res.land.save();
    res.json(updatedLand);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
    const updatedSeller = await res.seller.save();
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
    res.json(updatedSeller);
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
    const updatedBuyer = await res.buyer.save();
    res.json(updatedBuyer);

  } catch (err) {
    res.status(402).json({
      message: err.message
    });
  }
});

async function getLandFromDataBase(req, res, next) {
  let land;
  let id = req.body.id;
  try {
    land = await LandModel.findOne({
      id: id,
    });
  } catch (error) {
    console.log(error);
  }
  res.land = land;
  next();
}

async function getSellerFromDataBaseByUserName(req, res, next) {
  let user;
  let userName = req.query.seller;
  try {
    user = await UserModel.findOne({
      userName: userName,
    });
  } catch (error) {
    console.log(error);
  }
  res.seller = user;
  next();
}

async function getBuyerFromDataBaseByUserName(req, res, next) {

  let user;
  let userName = req.query.buyer;
  try {
    user = await UserModel.findOne({
      userName: userName,
    });
  } catch (error) {
    console.log(error);
  }
  res.buyer = user;
  next();
}

export default router;