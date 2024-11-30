// ENGR 102 Group Project
// Solar Investment class to store data related to a user's solar investment decision.

export default class SolarInvestment {
    constructor(location, energyCost, realEstateArea, householdSize, panelType) {
        this.location = location;
        this.energyCost = energyCost; // cost per kWh
        this.realEstateArea = realEstateArea; // area in square feet available for solar panels
        this.householdSize = householdSize; // number of people in household
        this.panelType = panelType; // type of solar panel
    }
}