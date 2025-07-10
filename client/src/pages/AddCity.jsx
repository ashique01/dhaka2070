import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function AddCity() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    lat: "",
    lng: "",
    population: "",
    pollutionIndex: "",
    crimeRate: "",
    aiIntegrationLevel: "",
    droneTrafficDensity: "",
    cyberSecurityLevel: "",
    smartInfraScore: "",
    energySource: "",
    notableTech: "", // comma separated string
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    if (!formData.name.trim()) return "Zone name is required.";
    if (!formData.description.trim()) return "Description is required.";
    if (!formData.lat || isNaN(parseFloat(formData.lat)))
      return "Valid latitude is required.";
    if (!formData.lng || isNaN(parseFloat(formData.lng)))
      return "Valid longitude is required.";
    if (!image) return "Zone image is required.";

    const numericFields = [
      "population",
      "pollutionIndex",
      "crimeRate",
      "aiIntegrationLevel",
      "droneTrafficDensity",
      "cyberSecurityLevel",
      "smartInfraScore",
    ];
    for (const field of numericFields) {
      if (formData[field] !== "" && isNaN(Number(formData[field]))) {
        return `Field "${field}" must be a valid number.`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append(
        "coords",
        JSON.stringify({
          lat: parseFloat(formData.lat),
          lng: parseFloat(formData.lng),
        })
      );
      data.append("population", formData.population || "");
      data.append("pollutionIndex", formData.pollutionIndex || "");
      data.append("crimeRate", formData.crimeRate || "");
      data.append("aiIntegrationLevel", formData.aiIntegrationLevel || "");
      data.append("droneTrafficDensity", formData.droneTrafficDensity || "");
      data.append("cyberSecurityLevel", formData.cyberSecurityLevel || "");
      data.append("smartInfraScore", formData.smartInfraScore || "");
      data.append("energySource", formData.energySource || "");
      const techArray = formData.notableTech
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean);
      data.append("notableTech", JSON.stringify(techArray));
      data.append("image", image);
      await api.post("/city", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      navigate("/");
    } catch {
      setError("Something went wrong while adding the zone.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-web3-card p-8 rounded-3xl border border-web3-border shadow-web3-glow-purple text-web3-text-primary my-10 font-futuristic">
      <Link
        to="/admin/dashboard"
        className="inline-block mb-6 text-web3-accent-blue hover:underline font-semibold transition-colors duration-300"
      >
        ← Back to Dashboard
      </Link>
      <h2 className="text-4xl font-extrabold text-web3-accent-blue mb-8 text-center drop-shadow-[0_0_10px_rgba(33,150,243,0.8)]">
        ➕ Add New Futuristic Zone
      </h2>

      {error && (
        <div
          className="mb-6 p-3 bg-red-700/50 border border-red-600 rounded text-center font-semibold text-red-200"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Zone Name */}
        <div>
          <label className="block mb-2 font-semibold text-web3-text-secondary">
            Zone Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Cyber City"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-xl bg-web3-input-bg border border-web3-border placeholder-web3-placeholder
            text-web3-text-primary focus:outline-none focus:ring-2 focus:ring-web3-accent-blue transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-semibold text-web3-text-secondary">
            Description
          </label>
          <textarea
            name="description"
            rows={4}
            placeholder="Describe the zone..."
            value={formData.description}
            onChange={handleChange}
            className="w-full px-5 py-3 rounded-xl bg-web3-input-bg border border-web3-border placeholder-web3-placeholder
            text-web3-text-primary focus:outline-none focus:ring-2 focus:ring-web3-accent-blue transition resize-y"
          />
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold text-web3-text-secondary">
              Latitude
            </label>
            <input
              type="number"
              name="lat"
              step="any"
              placeholder="23.780573"
              value={formData.lat}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-web3-input-bg border border-web3-border placeholder-web3-placeholder
            text-web3-text-primary focus:outline-none focus:ring-2 focus:ring-web3-accent-blue transition"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-web3-text-secondary">
              Longitude
            </label>
            <input
              type="number"
              name="lng"
              step="any"
              placeholder="90.419735"
              value={formData.lng}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-web3-input-bg border border-web3-border placeholder-web3-placeholder
            text-web3-text-primary focus:outline-none focus:ring-2 focus:ring-web3-accent-blue transition"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              label: "Population",
              name: "population",
              placeholder: "21000000",
            },
            {
              label: "Pollution Index (0-500)",
              name: "pollutionIndex",
              placeholder: "150",
            },
            {
              label: "Crime Rate (per 1000)",
              name: "crimeRate",
              placeholder: "3.5",
              step: "0.1",
            },
            {
              label: "AI Integration Level (0-10)",
              name: "aiIntegrationLevel",
              placeholder: "8",
              min: 0,
              max: 10,
              step: "0.1",
            },
            {
              label: "Drone Traffic Density (0-100)",
              name: "droneTrafficDensity",
              placeholder: "50",
              min: 0,
              max: 100,
            },
            {
              label: "Cyber Security Level (0-10)",
              name: "cyberSecurityLevel",
              placeholder: "9",
              min: 0,
              max: 10,
              step: "0.1",
            },
            {
              label: "Smart Infrastructure Score (0-100)",
              name: "smartInfraScore",
              placeholder: "85",
              min: 0,
              max: 100,
            },
          ].map(({ label, name, placeholder, min, max, step }) => (
            <div key={name}>
              <label className="block mb-2 font-semibold text-web3-text-secondary">
                {label}
              </label>
              <input
                type="number"
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                min={min}
                max={max}
                step={step || "any"}
                className="w-full px-5 py-3 rounded-xl bg-web3-input-bg border border-web3-border placeholder-web3-placeholder
              text-web3-text-primary focus:outline-none focus:ring-2 focus:ring-web3-accent-blue transition"
              />
            </div>
          ))}

          <div className="col-span-full">
            <label className="block mb-2 font-semibold text-web3-text-secondary">
              Primary Energy Source
            </label>
            <input
              type="text"
              name="energySource"
              placeholder="Solar & Fusion"
              value={formData.energySource}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-web3-input-bg border border-web3-border placeholder-web3-placeholder
            text-web3-text-primary focus:outline-none focus:ring-2 focus:ring-web3-accent-blue transition"
            />
          </div>

          <div className="col-span-full">
            <label className="block mb-2 font-semibold text-web3-text-secondary">
              Notable Technologies (comma separated)
            </label>
            <input
              type="text"
              name="notableTech"
              placeholder="AI Surveillance, Drone Delivery, Quantum Computing"
              value={formData.notableTech}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl bg-web3-input-bg border border-web3-border placeholder-web3-placeholder
            text-web3-text-primary focus:outline-none focus:ring-2 focus:ring-web3-accent-blue transition"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-semibold text-web3-text-secondary">
            Zone Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full file:bg-web3-accent-blue file:text-white file:rounded-lg file:px-4 file:py-2 file:cursor-pointer
            bg-web3-input-bg border border-web3-border text-web3-text-primary" // Adjusted file input styling
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 rounded-lg border border-web3-border max-h-64 object-cover shadow-web3-glow-purple"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full py-4 bg-gradient-to-r from-web3-accent-blue to-web3-accent-purple rounded-full font-bold
          text-web3-text-primary shadow-web3-glow-blue hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed" // Adjusted gradient and shadow
        >
          {loading ? "Uploading..." : "Add Zone"}
        </button>
      </form>
    </div>
  );
}