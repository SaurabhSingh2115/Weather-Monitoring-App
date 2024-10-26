import { useState, useEffect } from "react";
import NavigationButtons from "./components/NavigationButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import ThresholdAlert from "./components/ThresholdAlert";
import TemperatureHistory from "./components/TemperatureHistory";

const App = () => {
  const [query, setQuery] = useState({ q: "Delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const getWeatherData = async () => {
    const data = await getFormattedWeatherData({ ...query, units });
    setWeather(data);
    console.log(data);
  };

  useEffect(() => {
    getWeatherData();
  }, [query, units]);

  const formattedBackground = () => {
    if (!weather) return "from-slate-800 to-black"; // Default background if weather is not available
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-gray-800 to-gray-900"; // Dark grey for lower temperatures
    return "from-purple-800 to-purple-900"; // Dark purple for higher temperatures
  };

  return (
    <div
      className={`mx-auto max-w-screen-lg mt-4 py-5 px-42 bg-gradient-to-br shadow-xl shadow-gray-400 ${formattedBackground()} rounded-lg`}
    >
      <NavigationButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <WeatherDetails weather={weather} units={units} />
          <Forecast title="3 hour step forecast" data={weather.hourly} />
          <Forecast title="daily forecast" data={weather.daily} />
          <TemperatureHistory />
          <ThresholdAlert
            temp={weather.temp}
            weatherCondition={weather.details}
          />
        </>
      )}
    </div>
  );
};

export default App;
