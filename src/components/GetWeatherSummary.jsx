import PropTypes from "prop-types";

const weatherSummaries = {
  Mist: "Low visibility due to small water droplets in the air. It often makes the surroundings appear hazy.",
  Fog: "Dense water droplets suspended in the air, reducing visibility significantly.",
  Clear: "Bright and sunny conditions with no significant cloud cover.",
  Clouds: "Overcast skies with various cloud formations.",
  Rain: "Precipitation in the form of water droplets falling from the clouds.",
  Snow: "Snowflakes falling, which may accumulate depending on the temperature.",
  Thunderstorm:
    "A storm accompanied by thunder, lightning, and often heavy rain or hail.",
  Drizzle: "Light rain with fine drops of water falling steadily.",
};

const GetWeatherSummary = ({ condition }) => {
  return <div>{weatherSummaries[condition] || "No summary available."}</div>;
};

GetWeatherSummary.propTypes = {
  condition: PropTypes.string.isRequired,
};

export default GetWeatherSummary;
