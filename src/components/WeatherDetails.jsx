import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FiWind } from "react-icons/fi";

const verticalDetails = [
  {
    id: 1,
    Icon: FaThermometerEmpty,
    title: "Feels Like",
    value: "22°",
  },
  {
    id: 2,
    Icon: BiSolidDropletHalf,
    title: "Humidity",
    value: "64%", // Corrected humidity value
  },
  {
    id: 3,
    Icon: FiWind,
    title: "Wind",
    value: "11 km/h",
  },
];

const horizontalDetails = [
  {
    id: 1,
    Icon: GiSunrise,
    title: "Sunrise",
    value: "05:33 AM",
  },
  {
    id: 2,
    Icon: GiSunset,
    title: "Sunset",
    value: "08:33 PM",
  },
  {
    id: 3,
    Icon: MdKeyboardArrowUp,
    title: "Max temperature",
    value: "33°",
  },
  {
    id: 4,
    Icon: MdKeyboardArrowDown,
    title: "Min temperature",
    value: "21°",
  },
];

const TemperatureDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>Rain</p>
      </div>

      <div className="flex flex-row items-center justify-between py-3">
        <img
          src="http://openweathermap.org/img/wn/01d@2x.png"
          alt="weather icon"
          className="w-20"
        />
        <p className="text-5xl">30°</p>
        <div className="flex flex-col space-y-3 items-start">
          {verticalDetails.map(({ id, Icon, title, value }) => (
            <div key={id}>
              <div className="flex font-light text-sm items-center justify-center">
                <Icon size={18} className="mr-1" />
                <span>{title}</span>
                <span className="font-medium ml-1">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-10 text-sm py-3">
        {horizontalDetails.map(({ id, Icon, title, value }) => (
          <div key={id} className="flex flex-row items-center">
            <Icon size={30} />
            <p className="font-light ml-1">
              {title}: <span className="font-medium ml-1">{value}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemperatureDetails;
