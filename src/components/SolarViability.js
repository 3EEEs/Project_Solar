// SolarViability.js

import { stateData } from "./StateData";

/**
 * Calculate the potential yearly energy output from the solar panel system.
 * Formula: Energy Output (kWh/year) = Irradiance (kWh/m²/day) * Efficiency * Area (m²) * 365 days.
 * @param {number} irradiance - Average solar irradiance (kWh/m²/day).
 * @param {number} efficiency - Solar panel efficiency (decimal form, e.g., 0.20 for 20%).
 * @param {number} area - Total area of solar panels in square feet.
 * @returns {number} Total energy output in kWh/year.
 */
function calculateEnergyOutput(irradiance, efficiency, area) {
  if (area <= 0) return 0; // No energy produced if area is 0 or negative
  const areaInMeters = area * 0.092903; // Convert area from ft² to m²
  return irradiance * efficiency * areaInMeters * 365; // Energy output in kWh/year
}

/**
 * Calculate yearly cost savings from solar panels.
 * Formula: Savings ($) = Min(energyOutput, energyUsage) * energyCost.
 * @param {number} energyOutput - Total energy generated by the solar panels (kWh/year).
 * @param {number} energyCost - Electricity cost in dollars/kWh.
 * @param {number} energyUsage - Household energy consumption (kWh/year).
 * @returns {number} Yearly savings in $.
 */
function calculateCostSavings(energyOutput, energyCost, energyUsage) {
  if (energyOutput <= 0) return 0;
  return Math.abs(energyOutput - energyUsage) * energyCost; // Savings in $
}

/**
 * Calculate the payback period for the solar investment, considering increasing electricity prices.
 * Each year, electricity price increases by a fixed rate (e.g., 3% annually).
 * @param {number} initialCost - Total upfront cost of the solar panel system ($).
 * @param {number} energyCost - Initial electricity cost ($/kWh).
 * @param {number} energyUsage - Household energy consumption (kWh/year).
 * @param {number} savings - Initial savings per year ($).
 * @param {number} priceIncreaseRate - Annual increase in electricity price (as a decimal).
 * @returns {number} Payback period in years.
 */
function calculatePaybackPeriodWithPriceIncrease(
  initialCost,
  energyCost,
  energyUsage,
  savings,
  priceIncreaseRate,
) {
  let cumulativeSavings = 0;
  let years = 0;

  // Iterate year by year, increasing electricity cost by the given percentage.
  while (cumulativeSavings < initialCost) {
    const currentSavings = Math.min(energyUsage * energyCost, savings); // Savings for the current year
    cumulativeSavings += currentSavings;
    energyCost *= 1 + priceIncreaseRate; // Increase electricity cost by the rate
    years++;
    if (cumulativeSavings >= initialCost) break;
  }

  return years;
}

/**
 * Assess the viability of a solar investment, considering electricity price increases over time.
 * @param {Object} solarInvestment - Details of the investment (location, energy cost, etc.).
 * @param {Object} panel - The solar panel type being used (efficiency, cost).
 * @returns {Object} Results of the assessment including energy output, yearly savings, payback period, and viability.
 */
export function assessSolarViability(solarInvestment, panel) {
  const state = solarInvestment.location;
  const stateInfo = stateData[state];

  if (!stateInfo) {
    return `Data for ${state} not found.`;
  }

  const irradiance = stateInfo.irradiance;
  const energyCost = solarInvestment.energyCost / 100; // Convert cost from cents to dollars

  // Calculate yearly energy output from the solar panels
  const energyOutput = calculateEnergyOutput(
    irradiance,
    panel.efficiency,
    solarInvestment.realEstateArea,
  );

  const energyUsage = 10800; // kWh/year (default household energy usage)

  // Check if area is 0 or energy output is 0
  if (solarInvestment.realEstateArea <= 0 || energyOutput <= 0) {
    return {
      location: solarInvestment.location,
      energyOutput: "0 kWh/year",
      yearlySavings: "$0/year",
      initialCost: "$0",
      paybackPeriod: "N/A",
      viability: "No",
    };
  }

  const yearlySavings = calculateCostSavings(
    energyOutput,
    energyCost,
    energyUsage,
  );
  const initialCost = panel.costPerSquareFoot * solarInvestment.realEstateArea;

  // Use the function considering price increase for calculating the payback period
  const paybackPeriod = calculatePaybackPeriodWithPriceIncrease(
    initialCost,
    energyCost,
    energyUsage,
    yearlySavings,
    0.03,
  );

  const viable = paybackPeriod <= 10; // Viable if payback period is ≤ 10 years

  return {
    location: solarInvestment.location,
    energyOutput: `${energyOutput.toFixed(2)} kWh/year`,
    yearlySavings: `$${yearlySavings.toFixed(2)}/year`,
    initialCost: `$${initialCost.toFixed(2)}`,
    paybackPeriod: `${paybackPeriod} years`,
    viability: viable ? "Yes" : "No",
  };
}