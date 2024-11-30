import React, { useState } from "react";
import SolarInvestment from "./components/SolarInvestment";
import SolarPanel from "./components/SolarPanel";
import { assessSolarViability } from "./components/SolarViability";
import { stateData } from "./components/StateData";
import "./App.css"; // Import the CSS file

function App() {
  const [formData, setFormData] = useState({
    location: "Please Select", // Default to "Please Select"
    energyCost: "",
    realEstateArea: "",
    householdSize: "",
    panelType: "Please Select", // Default to "Please Select"
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if location or panelType is "Please Select"
    if (
      formData.location === "Please Select" ||
      formData.panelType === "Please Select"
    ) {
      alert("Please select a valid location and panel type.");
      return;
    }

    const investment = new SolarInvestment(
      formData.location,
      parseFloat(formData.energyCost),
      parseFloat(formData.realEstateArea),
      parseInt(formData.householdSize, 10),
      formData.panelType,
    );

    const panel = new SolarPanel(
      formData.panelType,
      formData.panelType === "Monocrystalline"
        ? 0.2
        : formData.panelType === "Polycrystalline"
          ? 0.18
          : 0.15,
    );

    const viabilityResult = assessSolarViability(investment, panel);
    setResult(viabilityResult);
  };

  return (
    <div className="app-container">
      <h1 className="app-header">Solar Viability Calculator</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label className="form-label">
          Location:
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Please Select">Please Select</option>
            {Object.keys(stateData).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
        <label className="form-label">
          Energy Cost (cents/kWh):
          <input
            type="number"
            name="energyCost"
            value={formData.energyCost}
            onChange={handleChange}
            step="0.01"
            className="form-input"
          />
        </label>
        <label className="form-label">
          Real Estate Area (ft²):
          <input
            type="number"
            name="realEstateArea"
            value={formData.realEstateArea}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Household Size:
          <input
            type="number"
            name="householdSize"
            value={formData.householdSize}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Panel Type:
          <select
            name="panelType"
            value={formData.panelType}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Please Select">Please Select</option>
            <option value="Monocrystalline">Monocrystalline</option>
            <option value="Polycrystalline">Polycrystalline</option>
            <option value="Thin-film">Thin-film</option>
          </select>
        </label>
        <button type="submit" className="form-button">
          Calculate
        </button>
      </form>
      {result && (
        <div className="results-container">
          <h2>Results:</h2>
          <p>
            <strong>Location:</strong> {result.location}
          </p>
          <p>
            <strong>Energy Output:</strong> {result.energyOutput}
          </p>
          <p>
            <strong>Yearly Savings:</strong> {result.yearlySavings}
          </p>
          <p>
            <strong>Initial Cost:</strong> {result.initialCost}
          </p>
          <p>
            <strong>Payback Period:</strong> {result.paybackPeriod}
          </p>
          <p>
            <strong>Viability:</strong> {result.viability}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
