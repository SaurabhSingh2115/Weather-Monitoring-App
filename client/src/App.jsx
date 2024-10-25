import { useState, useEffect } from "react";
import NavigationButtons from "./components/NavigationButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import ThresholdAlert from "./components/ThresholdAlert";

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
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-400 to-orange-700";
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
