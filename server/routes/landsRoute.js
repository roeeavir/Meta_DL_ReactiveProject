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

router.patch("/", getLandFromDataBase, async (req, res) => {
    console.log("Yeseeeeeeeeee")
    if (req.body.price != null&& req.body.price != undefined&& req.body.price != ""&& req.body.price > 0) {
        res.land.price = req.body.price;
    }
    try {
        const updatedSite = await res.land.save();
        res.json(updatedSite);
        // if name changed, delete old HTML page and create new one
        recreateHTMLPages();
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
