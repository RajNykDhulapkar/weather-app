import { Router, IRouter } from "express";
import {
  ApiResponse,
  WeatherData,
  ErrorResponse,
  ErrorCode,
  ForecastData,
  WeatherApiResponse,
} from "@weather-app/types";
import { env } from "../env";

const weatherRouter: IRouter = Router();

// Interface for OpenWeather API response
interface OpenWeatherResponse {
  main: {
    temp: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  name: string;
}

interface OpenWeatherForecastResponse {
  list: Array<{
    main: {
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    dt_txt: string;
  }>;
}

async function fetchWeatherData(city: string): Promise<WeatherData> {
  const apiKey = env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("CITY_NOT_FOUND");
    }
    throw new Error("WEATHER_API_ERROR");
  }

  const data: OpenWeatherResponse = await response.json();

  return {
    temperature: data.main.temp,
    minTemperature: data.main.temp_min,
    maxTemperature: data.main.temp_max,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    rain: data.rain?.["1h"] || 0,
    cloudy: data.clouds.all,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    city: data.name,
  };
}

async function fetchWeatherForecast(city: string): Promise<ForecastData[]> {
  const apiKey = env.OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("WEATHER_API_ERROR");
  }

  const data: OpenWeatherForecastResponse = await response.json();

  return data.list
    .filter((_item, index) => index % 8 === 0) // Get forecast every 8 hours (1 day interval)
    .map((item) => ({
      day: new Date(item.dt_txt).toLocaleString("en", { weekday: "short" }),
      minTemperature: item.main.temp_min,
      maxTemperature: item.main.temp_max,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    }));
}

weatherRouter.get<
  {},
  ApiResponse<WeatherApiResponse> | ErrorResponse,
  {},
  { city: string }
>("/", async (req, res): Promise<void> => {
  try {
    const city = req.query.city;

    if (!city) {
      res.status(400).json({
        message: "City parameter is required",
        code: "MISSING_CITY",
      });
      return;
    }

    const weatherData = await fetchWeatherData(city);

    const forecastData = await fetchWeatherForecast(city);

    res.json({
      message: "Weather data retrieved successfully",
      data: { current: weatherData, forecast: forecastData },
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);

    if (error instanceof Error) {
      if (error.message === "CITY_NOT_FOUND") {
        res.status(404).json({
          message: "City not found",
          code: ErrorCode.CITY_NOT_FOUND,
        });
        return;
      }
    }

    res.status(500).json({
      message: "Failed to fetch weather data",
      code: ErrorCode.WEATHER_API_ERROR,
    });
  }
});

export default weatherRouter;
