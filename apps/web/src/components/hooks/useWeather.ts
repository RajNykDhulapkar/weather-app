import { env } from "@/env";
import { ForecastData, WeatherData } from "@weather-app/types";
import { useCallback, useEffect, useState } from "react";

const useWeather = (initialCity: string) => {
  const [city, setCity] = useState(initialCity);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWeather = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `${env.NEXT_PUBLIC_API_URL}/weather?city=${encodeURIComponent(city)}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data.data.current);
      setForecastData(data.data.forecast);
    } catch {
      setError("Failed to load weather data");
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    fetchWeather();
  }, []);

  return {
    city,
    setCity,
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeather,
  };
};

export default useWeather;
