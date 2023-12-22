/* eslint-disable @next/next/no-img-element */
"use client";

import { Wind, Droplets, Cloudy, CloudRainWind } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useCallback, useEffect, useRef, useState } from "react";

import { ForecastData, WeatherData } from "@weather-app/types";
import LoadingSkeleton from "../LoadingSkeleton";
import { env } from "@/env";

export default function WeatherDashboard() {
  const [city, setCity] = useState("New Delhi, India");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const mirrorRef = useRef<HTMLSpanElement>(null);

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
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (mirrorRef.current && inputRef.current) {
      inputRef.current.style.width = `${mirrorRef.current.offsetWidth + 0}px`;
    }
  }, [city]);

  const getWeatherIcon = (icon?: string): string => {
    switch (icon) {
      case "01d":
        return "day.svg";
      case "01n":
        return "night.svg";
      case "02d":
        return "cloudy-day-1.svg";
      case "02n":
        return "cloudy-night-1.svg";
      case "03d":
        return "cloudy-day-2.svg";
      case "03n":
        return "cloudy-night-2.svg";
      case "04d":
        return "cloudy-day-3.svg";
      case "04n":
        return "cloudy-night-3.svg";
      case "09d":
      case "09n":
        return "rainy-6.svg";
      case "10d":
      case "10n":
        return "rainy-3.svg";
      case "11d":
      case "11n":
        return "thunder.svg";
      case "13d":
      case "13n":
        return "snowy-3.svg";
      case "50d":
      case "50n":
        return "cloudy.svg";
      default:
        return "cloudy.svg";
    }
  };

  return (
    <Card className="w-full max-w-3xl p-6 space-y-6 bg-card border-none shadow-none text-card-foreground">
      <div className="text-muted-foreground  flex justify-center text-3xl">
        <span>Right now in </span>
        <span className="relative font-medium text-foreground inline-flex ml-1 items-center">
          <input
            ref={inputRef}
            className="outline-none font-bold border-none focus:outline-none bg-transparent px-[1px]"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchWeather();
              }
            }}
          />
          <span
            ref={mirrorRef}
            className="absolute invisible font-bold px-[2px]  top-full whitespace-nowrap"
          >
            {city || " "}
          </span>
        </span>
        <span>, it&apos;s {weatherData?.description || "loading..."}</span>
      </div>

      {error ? (
        <div className="text-red-500 grid place-items-center">
          <img src="/404.png" className="size-[18rem]" alt="not found" />
        </div>
      ) : loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={getWeatherIcon(weatherData?.icon)}
                alt={weatherData?.description || "weather icon"}
                className="size-48"
              />
            </div>

            <div className="flex flex-col gap-4 items-center justify-start">
              <div className="text-8xl font-thin text-muted-foreground">
                {weatherData
                  ? `${Math.round(weatherData.temperature)}°`
                  : "--°"}
              </div>

              <div>
                {Math.floor(weatherData?.minTemperature ?? 0)}° /{" "}
                {Math.ceil(weatherData?.maxTemperature ?? 0)}°
              </div>
            </div>
            <div className="space-y-2 px-6">
              <div className="flex items-center gap-4  text-muted-foreground">
                <Wind className="size-6" />
                <span>
                  {weatherData ? `${weatherData.windSpeed} m/s` : "--"}
                </span>
              </div>
              <div className="flex items-center gap-4  text-muted-foreground">
                <Droplets className="size-6" />
                <span>{weatherData ? `${weatherData.humidity}%` : "--"}</span>
              </div>

              <div className="flex items-center gap-4  text-muted-foreground">
                <Cloudy className="size-6" />
                <span>{weatherData ? `${weatherData.cloudy}%` : "--"}</span>
              </div>

              <div className="flex items-center gap-4  text-muted-foreground">
                <CloudRainWind className="size-6" />
                <span>{weatherData ? `${weatherData.rain} mm/h` : "--"}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {forecastData?.map((forecast) => (
              <div key={forecast.day} className="text-center space-y-2">
                <img
                  src={getWeatherIcon(forecast.icon)}
                  alt={forecast.description}
                  className="sizs-10 mx-auto text-muted-foreground"
                />
                <div className="uppercase text-lg font-bold text-muted-foreground">
                  {forecast.day}
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.floor(forecast.minTemperature)}° /{" "}
                  {Math.ceil(forecast.maxTemperature)}°
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
