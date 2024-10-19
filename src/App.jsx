import { useEffect } from "react";
import NavigationButtons from "./components/NavigationButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";

const App = () => {
  const getWeatherData = async () => {
    const data = await getFormattedWeatherData({ q: "London" });
    console.log(data);
  };

  useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <div
      className="mx-auto max-w-screen-lg mt-4 py-5 px-42 bg-gradient-to-br shadow-xl shadow-gray-400
      from-green-400 to-blue-500"
    >
      <NavigationButtons />
      <Inputs />
      <TimeAndLocation />
      <WeatherDetails />
      <Forecast />
      <Forecast />
    </div>
  );
};

export default App;
