import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

export default function EditCity() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialCityState = {
    name: "",
    description: "",
    coords: { lat: "", lng: "" },
    population: "",
    pollutionIndex: "",
    crimeRate: "",
    aiIntegrationLevel: "",
    droneTrafficDensity: "",
    cyberSecurityLevel: "",
    smartInfraScore: "",
    energySource: "",
    notableTech: "",
    image: "",
  };

  const [city, setCity] = useState(initialCityState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [redirectToAdmin, setRedirectToAdmin] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/city/${id}`)
      .then((res) => {
        const data = res.data;
        setCity({
          ...data,
          notableTech: Array.isArray(data.notableTech)
            ? data.notableTech.join(", ")
            : "",
          population: data.population || "",
          pollutionIndex: data.pollutionIndex || "",
          crimeRate: data.crimeRate || "",
          aiIntegrationLevel: data.aiIntegrationLevel || "",
          droneTrafficDensity: data.droneTrafficDensity || "",
          cyberSecurityLevel: data.cyberSecurityLevel || "",
          smartInfraScore: data.smartInfraScore || "",
          energySource: data.energySource || "",
          coords: data.coords || { lat: "", lng: "" },
          image: data.image || "",
        });
      })
      .catch(() => setMessage("❌ Failed to load zone data."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setRedirectToAdmin(checked);
    } else if (name === "lat" || name === "lng") {
      setCity((prev) => ({
        ...prev,
        coords: { ...prev.coords, [name]: value },
      }));
    } else {
      setCity((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateFields = () => {
    if (!city.name.trim()) return "Zone name is required.";
    if (!city.description.trim()) return "Description is required.";
    if (isNaN(parseFloat(city.coords.lat)))
      return "Valid latitude is required.";
    if (isNaN(parseFloat(city.coords.lng)))
      return "Valid longitude is required.";

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
      if (city[field] !== "" && isNaN(Number(city[field]))) {
        return `Field "${field}" must be a valid number.`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const validationError = validateFields();
    if (validationError) {
      setMessage(`⚠️ ${validationError}`);
      return;
    }

    setSaving(true);

    const payload = {
      ...city,
      coords: {
        lat: parseFloat(city.coords.lat),
        lng: parseFloat(city.coords.lng),
      },
      population: city.population === "" ? null : Number(city.population),
      pollutionIndex:
        city.pollutionIndex === "" ? null : Number(city.pollutionIndex),
      crimeRate: city.crimeRate === "" ? null : Number(city.crimeRate),
      aiIntegrationLevel:
        city.aiIntegrationLevel === "" ? null : Number(city.aiIntegrationLevel),
      droneTrafficDensity:
        city.droneTrafficDensity === ""
          ? null
          : Number(city.droneTrafficDensity),
      cyberSecurityLevel:
        city.cyberSecurityLevel === "" ? null : Number(city.cyberSecurityLevel),
      smartInfraScore:
        city.smartInfraScore === "" ? null : Number(city.smartInfraScore),
      notableTech: city.notableTech
        ? city.notableTech
            .split(",")
            .map((tech) => tech.trim())
            .filter(Boolean)
        : [],
    };

    try {
      await api.patch(`https://dhaka2070.onrender.com/city/${id}`, payload);
      setMessage("✅ Zone updated successfully!");
      setTimeout(() => {
        if (redirectToAdmin) navigate("/admin/dashboard");
      }, 1500);
    } catch {
      setMessage("❌ Failed to update zone. Please try again.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  if (loading) {
    return (
      <div
        className="flex flex-col justify-center items-center h-screen bg-web3-dark-bg text-web3-text-primary font-futuristic"
        role="status"
        aria-live="polite"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-web3-accent-purple mb-4"></div>
        <p className="text-lg text-web3-text-secondary">Loading zone data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-web3-card rounded-3xl shadow-web3-glow-purple text-web3-text-primary my-10 font-futuristic">
      {/* Navigation */}
      <div className="flex justify-between mb-8 text-sm">
        <Link to="/admin/dashboard" className="text-web3-accent-blue hover:underline transition-colors duration-300">
          ← Admin Dashboard
        </Link>
        <Link to={`/city/${id}`} className="text-web3-accent-purple hover:underline transition-colors duration-300">
          View Public Page →
        </Link>
      </div>

      <h1
        className="text-4xl font-extrabold text-web3-accent-blue mb-6 text-center drop-shadow-[0_0_8px_rgba(33,150,243,0.8)]"
        tabIndex={-1}
      >
        ✏️ Edit Zone
      </h1>

      {message && (
        <div
          className={`mb-6 p-4 rounded-lg text-center font-semibold transition-all duration-300
          ${
            message.includes("✅")
              ? "bg-green-700/30 text-green-400 border border-green-600/50"
              : message.includes("⚠️")
              ? "bg-yellow-700/30 text-yellow-400 border border-yellow-600/50"
              : "bg-red-700/30 text-red-400 border border-red-600/50"
          }`}
          role="alert"
          aria-live="assertive"
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div>
          <label
            className="block mb-2 font-semibold text-web3-text-secondary"
            htmlFor="name"
          >
            Zone Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={city.name}
            onChange={handleChange}
            placeholder="e.g. Quantum District"
            className="w-full rounded-xl px-5 py-3 bg-web3-input-bg border border-web3-border text-web3-text-primary
            focus:outline-none focus:ring-2 focus:ring-web3-accent-blue transition"
            required
          />
        </div>

        <div>
          <label
            className="block mb-2 font-semibold text-web3-text-secondary"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            value={city.description}
            onChange={handleChange}
            placeholder="Describe this futuristic zone..."
            className="w-full rounded-xl px-5 py-3 bg-web3-input-bg border border-web3-border text-web3-text-primary
            focus:outline-none focus:ring-2 focus:ring-web3-accent-blue transition resize-y"
            required
          />
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label
              className="block mb-2 font-semibold text-web3-text-secondary"
              htmlFor="lat"
            >
              Latitude
            </label>
            <input
              type="number"
              id="lat"
              name="lat"
              value={city.coords.lat}
              onChange={handleChange}
              step="any"
              placeholder="e.g. 23.777"
              className="w-full rounded-xl px-5 py-3 bg-web3-input-bg border border-web3-border text-web3-text-primary
            focus:outline-none focus:ring-2 focus:ring-web3-accent-blue transition"
              required
            />
          </div>
          <div>
            <label
              className="block mb-2 font-semibold text-web3-text-secondary"
              htmlFor="lng"
            >
              Longitude
            </label>
            <input
              type="number"
              id="lng"
              name="lng"
              value={city.coords.lng}
              onChange={handleChange}
              step="any"
              placeholder="e.g. 90.399"
              className="w-full rounded-xl px-5 py-3 bg-web3-input-bg border border-web3-border text-web3-text-primary
            focus:outline-none focus:ring-2 focus:ring-web3-accent-blue transition"
              required
            />
          </div>
        </div>

        {/* Futuristic & Realistic Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              label: "Population",
              id: "population",
              name: "population",
              placeholder: "e.g. 21,000,000",
            },
            {
              label: "Pollution Index (0-500)",
              id: "pollutionIndex",
              name: "pollutionIndex",
              placeholder: "e.g. 150",
              min: 0,
              max: 500,
            },
            {
              label: "Crime Rate (per 1000)",
              id: "crimeRate",
              name: "crimeRate",
              placeholder: "e.g. 3.5",
              step: "0.1",
            },
            {
              label: "AI Integration Level (0-10)",
              id: "aiIntegrationLevel",
              name: "aiIntegrationLevel",
              placeholder: "e.g. 8",
              min: 0,
              max: 10,
              step: "0.1",
            },
            {
              label: "Drone Traffic Density (0-100)",
              id: "droneTrafficDensity",
              name: "droneTrafficDensity",
              placeholder: "e.g. 50",
              min: 0,
              max: 100,
            },
            {
              label: "Cyber Security Level (0-10)",
              id: "cyberSecurityLevel",
              name: "cyberSecurityLevel",
              placeholder: "e.g. 9",
              min: 0,
              max: 10,
              step: "0.1",
            },
            {
              label: "Smart Infrastructure Score (0-100)",
              id: "smartInfraScore",
              name: "smartInfraScore",
              placeholder: "e.g. 85",
              min: 0,
              max: 100,
            },
          ].map(({ label, id, name, placeholder, min, max, step }) => (
            <div key={name}>
              <label
                className="block mb-2 font-semibold text-web3-text-secondary"
                htmlFor={id}
              >
                {label}
              </label>
              <input
                type="number"
                id={id}
                name={name}
                value={city[name]}
                onChange={handleChange}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step || "any"}
                className="w-full rounded-xl px-5 py-3 bg-web3-input-bg border border-web3-border text-web3-text-primary
              focus:outline-none focus:ring-2 focus:ring-web3-accent-blue transition"
              />
            </div>
          ))}

          <div className="col-span-full">
            <label
              className="block mb-2 font-semibold text-web3-text-secondary"
              htmlFor="energySource"
            >
              Primary Energy Source
            </label>
            <input
              type="text"
              id="energySource"
              name="energySource"
              value={city.energySource}
              onChange={handleChange}
              placeholder="e.g. Solar & Fusion"
              className="w-full rounded-xl px-5 py-3 bg-web3-input-bg border border-web3-border text-web3-text-primary
            focus:outline-none focus:ring-2 focus:ring-web3-accent-blue transition"
            />
          </div>

          <div className="col-span-full">
            <label
              className="block mb-2 font-semibold text-web3-text-secondary"
              htmlFor="notableTech"
            >
              Notable Technologies (comma separated)
            </label>
            <input
              type="text"
              id="notableTech"
              name="notableTech"
              value={city.notableTech}
              onChange={handleChange}
              placeholder="e.g. AI Surveillance, Drone Delivery, Quantum Computing"
              className="w-full rounded-xl px-5 py-3 bg-web3-input-bg border border-web3-border text-web3-text-primary
            focus:outline-none focus:ring-2 focus:ring-web3-accent-blue transition"
            />
          </div>
        </div>

        {/* Redirect checkbox */}
        <div className="flex items-center gap-2 mt-6">
          <input
            type="checkbox"
            id="redirect"
            checked={redirectToAdmin}
            onChange={handleChange}
            className="accent-web3-accent-blue"
          />
          <label htmlFor="redirect" className="text-web3-text-secondary">
            Go to Admin Dashboard after saving
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={saving}
          className="mt-8 w-full flex justify-center items-center gap-3 rounded-full bg-gradient-to-r from-web3-accent-blue to-web3-accent-purple px-8 py-4 text-lg font-bold
          text-web3-text-primary shadow-web3-glow-blue transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <div className="animate-spin h-6 w-6 border-t-2 border-b-2 border-web3-text-primary rounded-full"></div>
              Saving...
            </>
          ) : (
            <>
              <span>💾</span> Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
}