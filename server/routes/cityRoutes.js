const express = require("express");
const router = express.Router();
const { getAllCities, addCity, getCityById, updateCity, deleteCity } = require("../controllers/cityController");
const upload = require("../middleware/upload");

router.post("/", upload.single("image"), addCity);

router.get("/", getAllCities);
router.get("/:id", getCityById);
router.patch("/:id", updateCity);
router.delete("/:id", deleteCity)
module.exports = router;
