import express from "express";
import LandModel from "../models/landModel.js";
import UserModel from "../models/userModel.js";
import {
  getLands,
  postLand,
} from "../controllers/landsController.js";

const router = express.Router();

router.get("/", getLands);
router.post("/", postLand);

router.patch("/price", getLandFromDataBase, async (req, res) => {
  try {
    if (
      req.body.price == null ||
      req.body.price == undefined ||
      req.body.price == "" ||
      req.body.price < 0 ||
      parseInt(req.body.price) != req.body.price
    ) {
      return res.status(400).json({
        message: "Price is not valid",
      });
    }
    res.land.price = req.body.price;
    const updatedLand = await res.land.save();
    res.json(updatedLand);
  } catch (err) {
    res.status(400).json({
      message: err.message,
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
      message: err.message,
    });
  }
});

router.patch("/game", getLandFromDataBase, async (req, res) => {
  let pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  if (
    !pattern.test(req.body.game) &&
    req.body.game != null &&
    req.body.game != undefined &&
    req.body.game != "" &&
    req.body.game != "N/A"
  ) {
    return res.status(400).json({
      message: "Game is not valid",
    });
  }
  res.land.game = req.body.game;
  try {
    const updatedLand = await res.land.save();
    res.json(updatedLand);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

router.patch(
  "/purchase",
  getLandFromDataBase,
  getBuyerFromDataBaseByUserName,
  getSellerFromDataBaseByUserName,
  async (req, res) => {
    if (res.buyer == null) {
      return res.status(400).json({
        message: "Buyer is not valid",
      });
    }

    res.land.owner = res.buyer.userName;
    res.land.price = "N/A";
    res.land.isForSale = false;
    res.land.game = "N/A";
    try {
      const updatedLand = await res.land.save();
      res.json(updatedLand);
    } catch (err) {
      res.status(402).json({
        message: err.message,
      });
    }
  }
);

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
    user.cash = parseInt(user.cash) + parseInt(req.body.price);
    user.save();
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
    user.cash = parseInt(user.cash) - parseInt(req.body.price);
    if (user.cash < 0) {
      res.buyer = null;
      return res.status(402).json({
        message: "Not enough cash",
      });
    }
    user.save();
  } catch (error) {
    console.log(error);
  }
  res.buyer = user;
  next();
}

export default router;
