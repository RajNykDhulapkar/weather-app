"use client";
/* eslint-disable @next/next/no-img-element */
import useWeather from "@/components/hooks/useWeather";
import { Card } from "@/components/ui/card";
import WeatherSearch from "../WeatherSearch";
import LoadingSkeleton from "../LoadingSkeleton";
import WeatherIcon from "../WeatherIcon";
import WeatherTemperature from "../WeatherTemperature";
import WeatherMetric from "../WeatherMetric";
import { CloudRainWind, Cloudy, Droplets, Wind } from "lucide-react";
import WeatherForecast from "../WeatherForecast";

export default function WeatherDashboard() {
  const {
    city,
    setCity,
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeather,
  } = useWeather("New Delhi, India");

  if (error) {
    return (
      <Card className="w-full max-w-3xl p-6 space-y-6 bg-card border-none shadow-none text-card-foreground">
        <WeatherSearch
          city={city}
          description={weatherData?.description}
          onCityChange={setCity}
          onSearch={fetchWeather}
        />
        <div className="text-red-500 grid place-items-center">
          <img src="/404.png" className="size-[18rem]" alt="not found" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl p-6 space-y-6 bg-card border-none shadow-none text-card-foreground">
      <WeatherSearch
        city={city}
        description={weatherData?.description}
        onCityChange={setCity}
        onSearch={fetchWeather}
      />

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <WeatherIcon
              icon={weatherData?.icon}
              description={weatherData?.description}
              className="size-48"
            />

            <WeatherTemperature
              temperature={weatherData?.temperature}
              minTemperature={weatherData?.minTemperature}
              maxTemperature={weatherData?.maxTemperature}
            />

            <div className="space-y-2 px-6">
              <WeatherMetric
                icon={<Wind className="size-6" />}
                value={weatherData?.windSpeed ?? "--"}
                unit=" m/s"
              />
              <WeatherMetric
                icon={<Droplets className="size-6" />}
                value={weatherData?.humidity ?? "--"}
                unit="%"
              />
              <WeatherMetric
                icon={<Cloudy className="size-6" />}
                value={weatherData?.cloudy ?? "--"}
                unit="%"
              />
              <WeatherMetric
                icon={<CloudRainWind className="size-6" />}
                value={weatherData?.rain ?? "--"}
                unit=" mm/h"
              />
            </div>
          </div>

          {forecastData && <WeatherForecast forecast={forecastData} />}
        </>
      )}
    </Card>
  );
}
