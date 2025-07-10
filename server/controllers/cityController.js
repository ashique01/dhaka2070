const City = require("../models/City");

// Helper to parse JSON fields if sent as strings (e.g., from forms)
const parseJSONField = (field) => {
  if (!field) return null;
  if (typeof field === "string") {
    try {
      return JSON.parse(field);
    } catch {
      return field; // fallback: return as-is if not JSON parsable
    }
  }
  return field;
};

const getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const addCity = async (req, res) => {
  try {
    const {
      name,
      description,
      coords,
      population,
      pollutionIndex,
      crimeRate,
      aiIntegrationLevel,
      droneTrafficDensity,
      cyberSecurityLevel,
      smartInfraScore,
      energySource,
      notableTech,
    } = req.body;

    // Parse coords if sent as stringified JSON
    const parsedCoords = parseJSONField(coords);

    // Parse notableTech as array if string
    const parsedNotableTech = parseJSONField(notableTech) || [];

    const city = new City({
      name,
      description,
      coords: parsedCoords,
      image: req.file?.path || null,
      population: population ? Number(population) : 0,
      pollutionIndex: pollutionIndex ? Number(pollutionIndex) : 0,
      crimeRate: crimeRate ? Number(crimeRate) : 0,
      aiIntegrationLevel: aiIntegrationLevel ? Number(aiIntegrationLevel) : 0,
      droneTrafficDensity: droneTrafficDensity ? Number(droneTrafficDensity) : 0,
      cyberSecurityLevel: cyberSecurityLevel ? Number(cyberSecurityLevel) : 0,
      smartInfraScore: smartInfraScore ? Number(smartInfraScore) : 0,
      energySource: energySource || "",
      notableTech: Array.isArray(parsedNotableTech)
        ? parsedNotableTech
        : [parsedNotableTech],
    });

    await city.save();
    res.status(201).json(city);
  } catch (error) {
    console.error("Error adding city:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) return res.status(404).json({ message: "City not found" });
    res.json(city);
  } catch (err) {
    console.error("Error fetching city by id:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCity = async (req, res) => {
  try {
    const {
      coords,
      notableTech,
      population,
      pollutionIndex,
      crimeRate,
      aiIntegrationLevel,
      droneTrafficDensity,
      cyberSecurityLevel,
      smartInfraScore,
      energySource,
      ...otherFields
    } = req.body;

    const updateData = {
      ...otherFields,
    };

    if (coords) updateData.coords = parseJSONField(coords);
    if (notableTech) {
      const parsedNotableTech = parseJSONField(notableTech);
      updateData.notableTech = Array.isArray(parsedNotableTech)
        ? parsedNotableTech
        : [parsedNotableTech];
    }
    if (population !== undefined) updateData.population = Number(population);
    if (pollutionIndex !== undefined) updateData.pollutionIndex = Number(pollutionIndex);
    if (crimeRate !== undefined) updateData.crimeRate = Number(crimeRate);
    if (aiIntegrationLevel !== undefined) updateData.aiIntegrationLevel = Number(aiIntegrationLevel);
    if (droneTrafficDensity !== undefined) updateData.droneTrafficDensity = Number(droneTrafficDensity);
    if (cyberSecurityLevel !== undefined) updateData.cyberSecurityLevel = Number(cyberSecurityLevel);
    if (smartInfraScore !== undefined) updateData.smartInfraScore = Number(smartInfraScore);
    if (energySource !== undefined) updateData.energySource = energySource;

    // Support image update if file uploaded
    if (req.file?.path) {
      updateData.image = req.file.path;
    }

    const updatedCity = await City.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedCity) return res.status(404).json({ message: "City not found" });

    res.json(updatedCity);
  } catch (err) {
    console.error("Error updating city:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCity = async (req, res) => {
  try {
    const deleted = await City.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "City not found" });
    res.json({ message: "City deleted successfully" });
  } catch (err) {
    console.error("Error deleting city:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllCities,
  addCity,
  getCityById,
  updateCity,
  deleteCity,
};
