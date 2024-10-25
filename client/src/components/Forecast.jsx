import PropTypes from "prop-types";

const Forecast = ({ title, data = [] }) => {
  return (
    <div className="flex flex-col items-center mt-6">
      <p className="font-medium uppercase mb-2">{title}</p>
      <div className="flex justify-between w-full max-w-screen-lg">
        {data.map((d, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="font-light text-sm mb-1">{d.title}</p>
            <img src={d.icon} alt="weather icon" className="w-12 mb-1" />
            <p className="font-medium">{`${d.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Define propTypes outside the component's return statement
Forecast.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      temp: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Forecast;
