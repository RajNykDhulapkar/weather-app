import { Router, IRouter } from "express";
import {
  ApiResponse,
  WeatherData,
  ErrorResponse,
  ErrorCode,
} from "@weather-app/types";
import { env } from "../env";

const weatherRouter: IRouter = Router();

// Interface for OpenWeather API response
interface OpenWeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    description: string;
  }>;
  name: string;
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
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    description: data.weather[0].description,
    city: data.name,
  };
}

weatherRouter.get<
  {},
  ApiResponse<WeatherData> | ErrorResponse,
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

    res.json({
      message: "Weather data retrieved successfully",
      data: weatherData,
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
