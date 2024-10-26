# Weather Monitoring App

## Overview

The Weather Monitoring App is a real-time service designed to provide weather data for major Indian cities. This application allows users to retrieve current weather information, including temperature, humidity, and weather conditions, as well as access historical weather data stored in a MongoDB database. Built with the MERN stack (MongoDB, Express, React, Node.js), the app fetches data from the OpenWeatherMap API and displays it in a user-friendly interface. Users can view detailed weather information for specific cities and monitor temperature trends over time.

## Demo Video Link:

https://drive.google.com/file/d/1YSfPQO3dKUiD8ICOv3TgOcDoWYo9tNNd/view?usp=sharing

## Project Structure

- `client/`: Contains the React frontend code.

  - `public/`: Contains static files like index.html.
  - `src/`: Contains the source code for the React application.
    - `components/`: Contains React components used in the application.
      - `NavigationButtons.jsx`: Component for navigation buttons.
      - `Inputs.jsx`: Component for input fields.
      - `TimeAndLocation.jsx`: Component to display time and location.
      - `WeatherDetails.jsx`: Component to display detailed weather information.
      - `Forecast.jsx`: Component to display weather forecast.
      - `TemperatureHistory.jsx`: Component to display temperature history.
      - `ThresholdAlert.jsx`: Component to display threshold alerts.
      - `WeatherDashboard.jsx`: Component to display the weather dashboard.
      - `App.jsx`: Main application component.
      - `index.jsx`: Entry point for the React application.
    - `services/`: Contains service files for API calls.
      - `weatherService.js`: Service file for weather-related API calls.
    - `styles/`: Contains CSS files for styling.
      - `App.css`: Main CSS file for the application.
    - `.env`: Example environment variables file for the client.
  - `package.json`: Contains dependencies and scripts for the client.

- `server/`: Contains the Express backend code.

  - `db/`: Contains database connection files.
    - `connect.js`: File to connect to MongoDB.
  - `models/`: Contains Mongoose models.
    - `Weather.js`: Mongoose model for weather data.
  - `index.js`: Entry point for the Express server.
  - `.env`: Example environment variables file for the server.
  - `package.json`: Contains dependencies and scripts for the server.
  - `.gitignore`: Specifies files and directories to be ignored by Git.

- `README.md`: Documentation file for the project.

This structure provides a clear separation of concerns, making it easier to manage and maintain the application.

## API Endpoints

### Get Weather Data for All Cities

- **Endpoint:** `GET /weather-data`
- **Description:** Fetches the latest weather data for all monitored cities. Returns up to the last 10 entries for each city.
- **Response:**
  ```json
  [
    {
      "name": "City Name",
      "country": "Country Code",
      "temp": "Temperature",
      "feels_like": "Feels Like Temperature",
      "temp_min": "Minimum Temperature",
      "temp_max": "Maximum Temperature",
      "timestamp": "Timestamp of the data",
      "createdAt": "Time of creation",
      "updatedAt": "Time of updation"
    }
  ]
  ```

### Get Weather Data for a Specific City

- **Endpoint:** `GET /weather-data/city`
- **Description:** Fetches the latest weather data for a specific city. Returns up to the last 10 entries for the specified city.
- **Parameters:**
  - `city`: The name of the city for which weather data is requested (case-sensitive).
- **Response:**
  ```json
  [
    {
      "name": "City Name",
      "country": "Country Code",
      "temp": "Temperature",
      "feels_like": "Feels Like Temperature",
      "temp_min": "Minimum Temperature",
      "temp_max": "Maximum Temperature",
      "timestamp": "Timestamp of the data",
      "createdAt": "Time of creation",
      "updatedAt": "Time of updation"
    }
  ]
  ```

### Monitored Cities

- Delhi
- Mumbai
- Chennai
- Bangalore
- Kolkata
- Hyderabad

## Setup and Installation

1. Clone the repository.

   ```
   git clone https://github.com/SaurabhSingh2115/Weather-Monitoring-App.git
   ```

2. Install the dependencies for both the backend and frontend.

   **server/**

   ```
   cd Weather-Monitoring-App/server
   npm install
   ```

   **client/**

   ```
   cd ../client
   npm install
   ```

3. Start the **backend** application.

   **server/**

   ```
   nodemon index.js
   ```

4. Start the **frontend** application in a new terminal.

   **client/**

   ```
   npm run dev
   ```

   For the time being, I have provided my OpenWeatherMap API key and MongoDB connection string in the code. It is better to use your own and store them inside a .env file for security reasons.

## Accessing the Application

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:5000](http://localhost:5000)
