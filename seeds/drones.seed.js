// Iteration #1

// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
const Drone = require("../models/Drone.model");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const drones = [
  { name: "Ultradron", propellers: 4, maxSpeed: 20 },
  { name: "Megadron", propellers: 8, maxSpeed: 18 },
  { name: "Decadron", propellers: 10, maxSpeed: 25 },
];

async function run() {
  try {
    await Drone.deleteMany({});
    const newDrone = await Drone.create(drones);
    console.log(`You have create ${newDrone.length} drones!`);
    mongoose.connection.close();
  } catch (error) {
    console.log(`There has been an error: `, error);
  }
}

run();
