// index.js
import express from "express";
import mongoose from "mongoose";
import fetch from "node-fetch";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";

dotenv.config();

const API_KEY = "96273f18aa48cba02ab66dae8f5b976c";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const port = process.env.PORT || 5000;

const cities = [
  "Delhi",
  "Mumbai",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];

const weatherSchema = new mongoose.Schema(
  {
    name: String,
    country: String,
    temp: Number,
    feels_like: Number,
    temp_min: Number,
    temp_max: Number,
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Weather = mongoose.model("Weather", weatherSchema);

const getFormattedWeatherData = async (searchParams) => {
  try {
    const url = new URL(BASE_URL);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return {
      name: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error(`Error fetching weather data for ${searchParams.q}:`, error);
    throw error;
  }
};

// Function to check if we should save new weather data
const shouldSaveWeatherData = async (cityName) => {
  try {
    const lastEntry = await Weather.findOne({ name: cityName }).sort({
      timestamp: -1,
    });

    if (!lastEntry) {
      console.log(
        `No previous entries found for ${cityName}, should save data`
      );
      return true;
    }

    const now = new Date();
    const timeDifference = now - lastEntry.timestamp;
    const oneHourInMs = 60 * 60 * 1000;

    const shouldSave = timeDifference >= oneHourInMs;
    console.log(
      `Time since last entry for ${cityName}: ${
        timeDifference / 1000 / 60
      } minutes`
    );
    console.log(`Should save new data for ${cityName}: ${shouldSave}`);

    return shouldSave;
  } catch (error) {
    console.error(`Error checking last weather entry for ${cityName}:`, error);
    return true;
  }
};

// Function to save weather data with check
const saveWeatherData = async (weatherData) => {
  try {
    const shouldSave = await shouldSaveWeatherData(weatherData.name);

    if (shouldSave) {
      const newWeatherEntry = new Weather(weatherData);
      const savedData = await newWeatherEntry.save();
      console.log(`Weather data saved successfully for ${weatherData.name}`);
      return { saved: true, data: savedData };
    } else {
      console.log(
        `Skipping save - data exists within the last hour for ${weatherData.name}`
      );
      return { saved: false, message: "Data exists within the last hour" };
    }
  } catch (error) {
    console.error(`Error saving weather data for ${weatherData.name}:`, error);
    throw error;
  }
};

const app = express();

// Route to get weather data for all cities
app.get("/weather-data", async (req, res) => {
  try {
    const data = await Weather.find()
      .sort({ timestamp: -1 })
      .limit(cities.length * 10); // Show last 10 entries for each city
    res.json(data);
  } catch (error) {
    console.error("Error fetching weather data from DB:", error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get weather data for a specific city
app.get("/weather-data/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const data = await Weather.find({ name: city })
      .sort({ timestamp: -1 })
      .limit(10);
    res.json(data);
  } catch (error) {
    console.error("Error fetching city weather data from DB:", error);
    res.status(500).json({ error: error.message });
  }
});

// Function to fetch and save weather data for all cities
const fetchAndSaveAllCitiesData = async () => {
  try {
    for (const city of cities) {
      try {
        const weatherData = await getFormattedWeatherData({
          q: city,
          units: "metric",
        });
        await saveWeatherData(weatherData);
      } catch (error) {
        console.error(`Error processing weather data for ${city}:`, error);
        // Continue with next city even if one fails
        continue;
      }
    }
    console.log("Completed weather data update for all cities");
  } catch (error) {
    console.error("Error in fetchAndSaveAllCitiesData:", error);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);

      // Initial fetch for all cities when server starts
      fetchAndSaveAllCitiesData();

      setInterval(fetchAndSaveAllCitiesData, 3600000); // Every hour
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
