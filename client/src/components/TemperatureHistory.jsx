// src/components/TemperatureHistory.js
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TemperatureHistory = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/weather-data");
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, []);

  const formatChartData = () => {
    const cities = [...new Set(weatherData.map((entry) => entry.name))];
    const datasets = cities.map((city) => {
      const cityData = weatherData
        .filter((entry) => entry.name === city)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      return {
        label: city,
        data: cityData.map((entry) => entry.temp),
        borderColor: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
        fill: false,
        tension: 0.1, // Add smooth curves
      };
    });

    const labels = weatherData
      .filter((entry) => entry.name === cities[0])
      .map((entry) => new Date(entry.timestamp).toLocaleTimeString());

    return { labels, datasets };
  };

  if (loading) {
    return <p className="text-center text-blue-600">Loading weather data...</p>;
  }

  return (
    <div className="container mx-auto my-10 p-5 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-5 text-white">
        City Temperature Data
      </h1>
      <div className="border border-white p-4 rounded-lg">
        <Line
          data={formatChartData()}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
                labels: {
                  color: "white", // Legend text color
                },
              },
              title: {
                display: true,
                text: "Temperature Over Time",
                color: "white", // Title text color
              },
            },
            elements: {
              point: {
                radius: 5, // Increase point size
                backgroundColor: "white", // Point color
                borderColor: "rgba(255, 255, 255, 0.5)", // Point border color
                borderWidth: 2, // Point border width
                hoverRadius: 7, // Increase point size on hover
              },
            },
            scales: {
              x: {
                ticks: {
                  color: "white", // X-axis tick color
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.2)", // X-axis grid color
                },
              },
              y: {
                ticks: {
                  color: "white", // Y-axis tick color
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.2)", // Y-axis grid color
                },
              },
            },
            layout: {
              padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default TemperatureHistory;
