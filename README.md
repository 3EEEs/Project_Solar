Project Solar - A Solar Viability Calculator
By CTRL ALT SUSTAIN

Overview
The Solar Viability Calculator is a React-based web application that helps users evaluate the feasibility of installing solar panels based on their location, energy costs, available real estate, and panel type. By calculating energy output, yearly savings, initial costs, and payback periods, this tool provides an intuitive way to determine if solar energy is a viable investment.

This project was bootstrapped with Create React App and developed by CTRL ALT SUSTAIN: Ethan Short, Wilson Wong, and Haden Ramberg, as part of a sustainability-focused software engineering initiative.

Features
- Dynamic Form Inputs: Users can input data such as location, energy costs, real estate area, and panel type.
- Custom Solar Panel Configurations: Includes support for monocrystalline, polycrystalline, and thin-film solar panels with varying efficiencies.
- Sunlight and Location Integration: Accounts for average sunlight hours per day and state-specific solar irradiance.
- Financial Metrics: Calculates energy output (kWh/year), yearly savings, initial costs, and payback period.
- Viability Assessment: Displays whether solar energy is a feasible investment based on a 10-year payback period threshold.

Tech Stack
- Frontend: React.js, HTML, CSS
- Backend Logic: JavaScript modules for calculations
- Data: State-level solar irradiance and dynamic input validations

Available Scripts
In the project directory, you can run:

`npm start`
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes. You may also see any lint errors in the console.

`npm test`
Launches the test runner in the interactive watch mode. See the section about running tests for more information.

`npm run build`
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include hashes. Your app is ready to be deployed!
See the section about deployment for more information.

`npm run eject`
Note: this is a one-way operation. Once you eject, you can't go back!
If you aren't satisfied with the build tool and configuration choices, you can eject at any time.

Usage
1. Enter the required data:
   - Select your location from the dropdown menu.
   - Input your energy cost (cents/kWh).
   - Provide the available real estate area for solar panels (in ft²).
   - Input the average sunlight hours per day.
   - Choose the panel type from the dropdown menu.
2. Calculate:
   - Click the Calculate button to view results.
3. Review Results:
   - Results will include energy output, yearly savings, initial costs, payback period, and viability assessment.

Components
- `App.js`:
  - Manages form data and renders the user interface.
  - Handles form submissions and integrates calculation logic.
- `SolarViability.js`:
  - Converts real estate area to metric units.
  - Computes energy output based on solar irradiance, efficiency, and area.
  - Estimates yearly cost savings and payback period.
  - Incorporates electricity price increases and sunlight adjustments.
- `StateData.js`:
  - Stores solar irradiance data for each U.S. state to provide location-specific insights.
- `SolarPanel.js`:
  - Models solar panel characteristics, including type and efficiency.
- `SolarInvestment.js`:
  - Represents user-provided inputs such as location, energy costs, and real estate area.

Formulas and Calculations
- **Energy Output (kWh/year)**
  `Energy Output = Irradiance × Efficiency × Area (m²) × Sunlight Hours × 365`

- **Cost Savings ($/year)**
  `Savings = min(Energy Output, Energy Usage) × Energy Cost`

- **Payback Period (years)**
  `Adjusted Payback Period = Base Payback Period × Sunlight Factor`

Incorporates a 3% annual increase in electricity prices.

Learn More
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)

Contributors
- **Ethan Short**: React integration, frontend logic and backend optimization
- **Wilson Wong**: State data handling, financial calculations, and backend class logic
- **Haden Ramberg**: Project Design

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For questions or suggestions, feel free to contact the contributors:
- Ethan Short: ethan8short@gmail.com
- Wilson Wong: wongw2@oregonstate.edu
- Haden Ramberg:
