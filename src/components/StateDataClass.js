// ENGR 102 Group Project
// StateData class to encapsulate state-specific solar data.

export class StateData {
    constructor(location, irradiance, energyCost) {
        this.location = location; // State name
        this.irradiance = irradiance; // Average solar irradiance (kWh/m²/day)
        this.energyCost = energyCost; // Electricity cost ($/kWh)
    }
}

