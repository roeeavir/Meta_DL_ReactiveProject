import express from "express";
import LandModel from "../models/landModel.js"
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

async function getLandFromDataBase(req, res,next) {
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

export default router;
