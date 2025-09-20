import { useState, useEffect } from 'react';

const useWeather = (latitude, longitude) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        // Fetch current and hourly data for humidity and precipitation
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m,precipitation&timezone=auto`;
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch weather data');
      }
      setLoading(false);
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  return { weatherData, loading, error };
};

export default useWeather;
