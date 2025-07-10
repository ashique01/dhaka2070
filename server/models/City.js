const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  coords: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  image: {
    type: String, // Cloudinary URL
    default: ""
  },

  // 🧠 Real-world fields
  population: {
    type: Number,
    default: 0
  },
  pollutionIndex: {
    type: Number, // e.g., 0–100
    default: 0
  },
  crimeRate: {
    type: Number, // e.g., incidents per 1000
    default: 0
  },

  // 🚀 Futuristic fields
  aiIntegrationLevel: {
    type: Number, // percentage 0–100
    default: 0
  },
  droneTrafficDensity: {
    type: Number, // drones per sq.km
    default: 0
  },
  cyberSecurityLevel: {
    type: Number, // 0 (low) to 10 (very high)
    default: 0
  },
  smartInfraScore: {
    type: Number, // 0–100
    default: 0
  },
  energySource: {
    type: String, // e.g., "Solar", "Fusion", "Hybrid Grid"
    default: ""
  },
  notableTech: {
    type: [String], // List of tech features
    default: []
  },

  // Optional timestamps
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("City", citySchema);
