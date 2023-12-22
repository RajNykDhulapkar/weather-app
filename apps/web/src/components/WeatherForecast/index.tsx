"use client";
import { ForecastData } from "@weather-app/types";
import WeatherIcon from "../WeatherIcon";

interface WeatherForecastProps {
  forecast: ForecastData[];
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => (
  <div className="grid grid-cols-5 gap-4">
    {forecast.map((data) => (
      <div key={data.day} className="text-center space-y-2">
        <WeatherIcon
          icon={data.icon}
          description={data.description}
          className="size-10 mx-auto text-muted-foreground"
        />
        <div className="uppercase text-lg font-bold text-muted-foreground">
          {data.day}
        </div>
        <div className="text-sm text-muted-foreground">
          {Math.floor(data.minTemperature)}° / {Math.ceil(data.maxTemperature)}°
        </div>
      </div>
    ))}
  </div>
);

export default WeatherForecast;
