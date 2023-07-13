const express = require("express");
const Drone = require("../models/Drone.model");
const router = express.Router();
const mongoose = require("mongoose");

// require the Drone model here

router.get("/drones", async (req, res, next) => {
  // Iteration #2: List the drones
  try {
    const droneList = await Drone.find({});
    res.render("drones/list", { droneList });
  } catch (error) {}
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form");
});

router.post("/drones/create", async (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed } = req.body;

  try {
    const newDron = await Drone.create({ name, propellers, maxSpeed });
    res.redirect("/drones");
  } catch (error) {
    console.log("There has been an error: ", error);
    res.redirect("/drones/create");
  }
});

router.get("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;

  const foundDrone = await Drone.findById(id);
  console.log(foundDrone);
  res.render("drones/update-form", { foundDrone });
});

router.post("/drones/:id/edit", async (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;

  try {
    const updatedDron = await Drone.findByIdAndUpdate(
      id,
      {
        name: name,
        propellers: propellers,
        maxSpeed: maxSpeed,
      },
      { new: true }
    );
    res.redirect("/drones");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

router.post("/drones/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;

    await Drone.findByIdAndDelete(id);

    res.redirect("/drones");
  } catch (error) {
    console.log("There has been an error: ", error);
  }
});

module.exports = router;
