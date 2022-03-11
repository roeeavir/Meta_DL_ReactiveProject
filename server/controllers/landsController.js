import LandModel from "../models/landModel.js";

export const getLands = async (req, res) => {
  try {
    var mysort = {
      id: 1,
    };
    const lands = await LandModel.find({}).sort(mysort);

    return res.status(200).json(lands);
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "Error getting lands",
    });
  }
};

export const postLand = (req, res) => {
  const post = req.body;

  const newLand = new LandModel(post);

  try {
    newLand.save();

    res.status(201).json(newLand);
  } catch (error) {
    res.status(409).json({
      message: "Error creating land",
    });
  }
};
export const updateLand = async (req, res) => {
  const id = req.params.id;
  const post = req.body;

  try {
    const land = await LandModel.findByIdAndUpdate(id, post);

    res.status(200).json(land);
  } catch (error) {
    res.status(404).json({
      message: "Error updating land",
    });
  }
};

export async function readLands() {
  console.log("readLands");
  try {
    LandModel.findOne(
      {
        id: "10000",
      },
      async (err, foundLand) => {
        if (foundLand) {
          console.log("Found land: ", foundLand);
        } else if (err) {
          console.log(err);
        } else {
          await LandModel.deleteMany();
          console.log(
            "Map is empty or not whole. Deleting and recreating map data"
          );
          await createAndInsertMapToDataBase().then(async () => {
            const map = await LandModel.find();
            console.log("Map: ", map);
          });
        }
      }
    );
  } catch (error) {
    console.log("error: ", error);
  }
}

async function createAndInsertMapToDataBase() {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      let id = 100 * i + j + 1;
      if (
        (i >= 20 && i <= 40 && j >= 1 && j <= 25) ||
        (i >= 70 && i <= 90 && j >= 51 && j <= 75)
      ) {
        saveLandToDataBase(id, "park");
      } else if (
        i == 0 ||
        j == 0 ||
        i == 99 ||
        j == 99 ||
        i % 10 == 0 ||
        j % 25 == 0
      ) {
        saveLandToDataBase(id, "road");
      } else {
        let price = Math.floor(Math.random() * 200) + 15;
        if (i > 40 && i < 60 && j > 25 && j < 50) {
          saveLandToDataBase(id, "nland", price);
        } else {
          saveLandToDataBase(id, "nland", price, true);
        }
      }
    }
  }
}

async function saveLandToDataBase(id, type, price, isForSale = false) {
  let land = new LandModel({
    id: id,
    type: type,
    price: price,
    isForSale: isForSale,
  });

  try {
    await land.save();
    console.log("id" + id + " saved");
  } catch (error) {
    console.log(error);
  }
}

