import React from "react";
import useWeather from "../assets/hooks/useWeather";
/* const latitude = 40.7128; // Example: New York City latitude
const longitude = -74.006; // Example: New York City longitude
 */
const WeatherTable = ({ city }) => {
  const { weatherData, loading, error } = useWeather(
    city.latitude,
    city.longitude
  );
  console.log(weatherData);

  const today = new Date();
  const todayFormatted = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  function mapWeatherCodeToIcon(code) {
    if (code === 0) return "icon-sunny.webp";
    if (code === 1 || code === 2) return "icon-partly-cloudy.webp";
    if (code === 3) return "icon-overcast.webp";
    if ([45, 48].includes(code)) return "icon-fog.webp";
    if ([51, 53, 55].includes(code)) return "icon-drizzle.webp";
    if ([61, 63, 65, 80, 81, 82].includes(code)) return "icon-rain.webp";
    if ([71, 73, 75].includes(code)) return "icon-snow.webp";
    if ([95, 96, 99].includes(code)) return "icon-storm.webp";

    return "";
  }

  console.log(todayFormatted);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!weatherData) return null;

  const current = weatherData.current;
  const humidity = weatherData.hourly.relative_humidity_2m[0]; // closest hourly humidity value
  const precipitation = weatherData.hourly.precipitation[0];

  return (
    <section className=" p-4 mt-6 flex justify-between  gap-10">
      <div className=" text-white  mb-4 w-2/3 h-auto  flex flex-col justify-between">
        {/* Hero Section table */}
        <div
          className="w-full h-64 
            bg-[url('/images/bg-today-small.svg')] 
            sm:bg-[url('/images/bg-today-large.svg')] 
             bg-no-repeat
             bg-center
             rounded-3xl
             flex items-center justify-between p-6"
        >
          <div className="flex flex-col justify-center items-start text-neutral-0 ">
            <h1 className="text-3xl">
              {city.name},{city.country}
            </h1>
            <h1 className="text-neutral-300">{todayFormatted}</h1>
          </div>
          <div className="flex justify-center items-center gap-4 p-4 text-neutral-0">
            <img className="w-24" src="images/icon-sunny.webp" alt="sunny" />
            <h1 className="text-[70px]">{current.temperature}°</h1>
          </div>
        </div>
        {/* Grid table */}
        <div className=" grid grid-cols-4 gap-4 mt-6 text-neutral-0">
          <div className="flex flex-col justify-center items-center bg-neutral-800 rounded-2xl h-24">
            <h1>Feels like</h1>
            <h2>{current.temperature}°</h2>
          </div>
          <div className="flex flex-col justify-center items-center bg-neutral-800 rounded-2xl h-24">
            <h1>Humidity</h1>
            <h2>{humidity}%</h2>
          </div>
          <div className="flex flex-col justify-center items-center bg-neutral-800 rounded-2xl h-24">
            <h1>Wind</h1>
            <h2> {current.windspeed}km/h</h2>
          </div>
          <div className="flex flex-col justify-center items-center bg-neutral-800 rounded-2xl h-24">
            <h1>Precipitation</h1>
            <h2>{precipitation} mm</h2>
          </div>
        </div>
        {/* Title  */}
        <h1 className="text-neutral-0 text-bold mt-5 mb-5">Daily forecast</h1>
        <div className=" grid grid-cols-7 gap-2  text-neutral-0">
          {weatherData.daily.slice(0, 7).map((day, i) => (
            <div
              key={i}
              className="p-2 bg-neutral-800 w-auto text-white rounded-lg flex flex-col justify-center items-center"
            >
              <div>
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </div>
              <img
                src={`/images/${mapWeatherCodeToIcon(day.code)}`}
                alt="icon"
                className="w-10 h-10 my-8"
              />
              <div className="flex   text-[14px]  w-full justify-between gap-2">
                <span>{day.max}°</span>
                <span className="text-gray-400">{day.min}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className=" bg-neutral-800 text-white  mb-4 w-1/3 h-auto rounded-3xl p-4 flex flex-col justify-around">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-neutral-0 font-bold">Hourly Forecast</h1>

          <button className="rounded-[8px] bg-neutral-600  px-4 py-2 hover:bg-red-400 flex gap-2 items-center text-neutral-0 text-bold">
            Tuesday
            <img src="images/icon-dropdown.svg" alt="dropdown" />
          </button>
        </div>
        <div className=" flex flex-col gap-2  text-neutral-0  ">
          <div className="flex justify-between items-center bg-neutral-700 rounded-2xl h-auto p-4">
            <div className="flex gap-2">
              <img
                className="w-[25px]"
                src="images/icon-rain.webp"
                alt="rain"
              />
              <h1>3 PM</h1>
            </div>
            <h1>20 °</h1>
          </div>
          <div className="flex justify-between items-center bg-neutral-700 rounded-2xl h-auto p-4">
            <div className="flex gap-2">
              <img
                className="w-[25px]"
                src="images/icon-rain.webp"
                alt="rain"
              />
              <h1>3 PM</h1>
            </div>
            <h1>20 °</h1>
          </div>
          <div className="flex justify-between items-center bg-neutral-700 rounded-2xl h-auto p-4">
            <div className="flex gap-2">
              <img
                className="w-[25px]"
                src="images/icon-rain.webp"
                alt="rain"
              />
              <h1>3 PM</h1>
            </div>
            <h1>20 °</h1>
          </div>
          <div className="flex justify-between items-center bg-neutral-700 rounded-2xl h-auto p-4">
            <div className="flex gap-2">
              <img
                className="w-[25px]"
                src="images/icon-rain.webp"
                alt="rain"
              />
              <h1>3 PM</h1>
            </div>
            <h1>20 °</h1>
          </div>
          <div className="flex justify-between items-center bg-neutral-700 rounded-2xl h-auto p-4">
            <div className="flex gap-2">
              <img
                className="w-[25px]"
                src="images/icon-rain.webp"
                alt="rain"
              />
              <h1>3 PM</h1>
            </div>
            <h1>20 °</h1>
          </div>
          <div className="flex justify-between items-center bg-neutral-700 rounded-2xl h-auto p-4">
            <div className="flex gap-2">
              <img
                className="w-[25px]"
                src="images/icon-rain.webp"
                alt="rain"
              />
              <h1>3 PM</h1>
            </div>
            <h1>20 °</h1>
          </div>
          <div className="flex justify-between items-center bg-neutral-700 rounded-2xl h-auto p-4">
            <div className="flex gap-2">
              <img
                className="w-[25px]"
                src="images/icon-rain.webp"
                alt="rain"
              />
              <h1>3 PM</h1>
            </div>
            <h1>20 °</h1>
          </div>
          <div className="flex justify-between items-center bg-neutral-700 rounded-2xl h-auto p-4">
            <div className="flex gap-2">
              <img
                className="w-[25px]"
                src="images/icon-rain.webp"
                alt="rain"
              />
              <h1>3 PM</h1>
            </div>
            <h1>20 °</h1>
          </div>
          <div className="flex justify-between items-center bg-neutral-700 rounded-2xl h-auto p-4">
            <div className="flex gap-2">
              <img
                className="w-[25px]"
                src="images/icon-rain.webp"
                alt="rain"
              />
              <h1>3 PM</h1>
            </div>
            <h1>20 °</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherTable;
