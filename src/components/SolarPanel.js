// ENGR 102 Group Project
// SolarPanel class to store specific information about panel types and efficiencies.

export default class SolarPanel {
  constructor(type, efficiency) {
    this.type = type; // panel type (e.g., "Monocrystalline")
    this.efficiency = efficiency; // efficiency as a decimal (e.g., 0.20 for 20%)

    // Define cost per square foot for each panel type
    this.costPerSquareFoot = this.getCostPerSquareFoot(type); // Set cost based on panel type
  }

  // Method to return the cost per square foot for the selected panel type
  getCostPerSquareFoot(type) {
    switch (type) {
      case "Please Select":
        return 0;
      case "Monocrystalline":
        return 18.58; // Monocrystalline: $18.58 per square foot
      case "Polycrystalline":
        return 13.93; // Polycrystalline: $13.93 per square foot
      case "Thin-film":
        return 9.29; // Thin-film: $9.29 per square foot
      default:
        return 0; // Return 0 if type is unknown
    }
  }
}
