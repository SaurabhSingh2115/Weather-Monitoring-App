import PropTypes from "prop-types";
import { useEffect } from "react";

const ThresholdAlert = ({ temp, weatherCondition }) => {
  useEffect(() => {
    if (temp <= 0) {
      console.log("Extreme Cold Alert: Stay indoors and keep warm!");
    } else if (temp > 0 && temp <= 10) {
      console.log("Cold Alert: Dress warmly!");
    } else if (temp > 10 && temp <= 25) {
      console.log("Mild Weather: Enjoy your day!");
    } else if (temp > 25 && temp <= 35) {
      console.log("Warm Weather: Stay hydrated!");
    } else if (temp > 35) {
      console.log("Extreme Heat Alert: Avoid going outside!");
    }

    if (weatherCondition === "rain") {
      console.log("Rain Alert: Carry an umbrella!");
    } else if (weatherCondition === "storm") {
      console.log("Storm Alert: Stay indoors and stay safe!");
    }
  }, [temp, weatherCondition]);

  return <div></div>;
};

ThresholdAlert.propTypes = {
  temp: PropTypes.number.isRequired,
  weatherCondition: PropTypes.string.isRequired,
};

export default ThresholdAlert;
