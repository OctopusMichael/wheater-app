import { useState, useEffect } from "react";

const useWeather = (latitude, longitude) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        // Fetch current + hourly + daily
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m,precipitation&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;

        const response = await fetch(url);
        const data = await response.json();

        // Structure daily data for easy use
        const dailyForecast = data.daily.time.map((date, i) => ({
          date,
          max: data.daily.temperature_2m_max[i],
          min: data.daily.temperature_2m_min[i],
          code: data.daily.weathercode[i],
        }));

        setWeatherData({
          current: data.current_weather,
          hourly: data.hourly,
          daily: dailyForecast, // <- now you have daily ready
        });

        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch weather data");
      }
      setLoading(false);
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  return { weatherData, loading, error };
};

export default useWeather;