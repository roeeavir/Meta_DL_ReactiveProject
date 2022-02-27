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

export async function readLands() {
    console.log('readLands')
    try {
        // const lands = await LandModel.find({})
        // console.log("Lands: ", lands)
        LandModel.findOne({
            id: "10000"
        }, async (err, foundLand) => {
            if (foundLand) {
                console.log("Found land: ", foundLand)
            } else if (err) {
                console.log(err)
            } else {
                await LandModel.deleteMany()
                console.log("Map is empty or not whole. Deleting and recreating map data")
                await createAndInsertMapToDataBase().then(async () => {
                    const map = await LandModel.find()
                    console.log("Map: ", map)
                })

            }
        })
    } catch (error) {
        console.log("error: ", error)
    }
}

async function createAndInsertMapToDataBase() {
    // var map = [];
    var indexes = [];
    var indexes2 = [];
    for (let i = 0; i < 20; i++) {
        indexes.push([0 + ";" + i]);
        indexes.push([i + ";" + 0]);
        indexes.push([i + ";" + 11]);
        indexes2.push([19 + ";" + i]);
        indexes2.push([19 - i + ";" + 19]);
        indexes2.push([19 - i + ";" + 8]);
        // indexes2.push([0 + ";" + (19 - i)])
        // indexes2.push([(19-i) + ";" + 0])
        // indexes2.push([(19-i) + ";" + i])
    }
    for (let i = 3; i < 18; i++) {
        indexes.push([5 + ";" + i]);
        indexes.push([9 + ";" + i]);
        indexes.push([13 + ";" + i]);
        indexes2.push([14 + ";" + i]);
        indexes2.push([10 + ";" + i]);
        indexes2.push([6 + ";" + i]);
    }

    // print indexes to console
    for (let k = 0; k < 25; k++) {
        console.log(k)
        if ((k >= 11 && k <= 12) || (k >= 8 && k <= 9)) {
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 20; j++) {
                    let id = k * 400 + i * 20 + (j + 1);
                    saveLandToDataBase(id, "park", "0");
                }
            }
        } else {
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 20; j++) {
                    let price = Math.floor(Math.random() * 200) + 15;
                    let id = k * 400 + i * 20 + (j + 1);
                    if (k % 2 == 0) {
                        let temp = i + ";" + j;
                        // check if land is in indexes
                        if (indexes.find((pos) => pos == temp)) {
                            saveLandToDataBase(id, "road", "0");
                        } else {
                            saveLandToDataBase(id, "nland", price + "0");
                        }

                        price = Math.floor(Math.random() * 16) + 5;
                    } else {
                        let temp = 19 - i + ";" + (19 - j);
                        if (indexes2.find((pos) => pos == temp)) {
                            saveLandToDataBase(id, "road", "0");
                        } else {
                            saveLandToDataBase(id, "nland", price + "");
                        }
                    }
                }
            }
        }
    }

    console.log("done")

    // let newMap = [];

    // for (let i = 0; i < map.length; i++) {
    //     let temp =
    //         Math.floor((Math.floor(i / 20) * 400) % 2000) +
    //         (i % 20) +
    //         20 * Math.floor((Math.floor(i / 20) * 400) / 2000) +
    //         1600 * Math.floor(i / 2000);

    //     let land = map[temp];
    //     newMap[i] = land;
    // }
}

async function saveLandToDataBase(id, type, price) {
    let land = new LandModel({
        id: id,
        type: type,
        price: price
    })

    try {
       await land.save()
       console.log("id" + id + " saved")
    } catch (error) {
        console.log(error)
    }

}