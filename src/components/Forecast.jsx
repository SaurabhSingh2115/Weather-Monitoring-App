const Forecast = () => {
  const data = [1, 2, 3, 4, 5]; // Example data
  return (
    <div className="flex flex-col items-center mt-6">
      <p className="font-medium uppercase mb-2">3 hour step forecast</p>
      <div className="flex justify-between w-full max-w-screen-lg">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <p className="font-light text-sm mb-1">Wed</p>
            <img
              src="http://openweathermap.org/img/wn/01d@2x.png"
              alt="weather icon"
              className="w-12 mb-1"
            />
            <p className="font-medium">12°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
